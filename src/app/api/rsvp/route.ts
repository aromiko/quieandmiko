import {
  sendGuestConfirmation,
  sendRsvpNotification
} from "@/lib/services/email-notification";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "[RSVP API]: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required"
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ContactInfo {
  email: string;
  contact_number: string;
  food_allergies: string;
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    responses,
    contactInfo
  }: {
    responses: Record<string, boolean>;
    contactInfo?: Record<string, ContactInfo>;
  } = body;

  if (!responses || typeof responses !== "object") {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }

  try {
    // Update attendance for all guests
    const attendanceUpdates = await Promise.all(
      Object.entries(responses).map(([id, is_attending]) =>
        supabase
          .from("guests")
          .update({ is_attending, updated_at: new Date().toISOString() })
          .eq("id", id)
      )
    );

    // Update contact info for adult guests (only if provided and attending)
    const contactUpdates = contactInfo
      ? await Promise.all(
          Object.entries(contactInfo).map(([id, info]) => {
            // Only update if the guest is attending
            if (responses[id] !== true) return { error: null };

            return supabase
              .from("guests")
              .update({
                email: info.email || null,
                contact_number: info.contact_number || null,
                food_allergies: info.food_allergies || null,
                updated_at: new Date().toISOString()
              })
              .eq("id", id);
          })
        )
      : [];

    const hasError =
      attendanceUpdates.some((res) => res.error) ||
      contactUpdates.some((res) => res.error);

    if (hasError) {
      return NextResponse.json(
        { error: "Some updates failed" },
        { status: 500 }
      );
    }

    // Fetch updated guest data and send email notification (fire-and-forget)
    const guestIds = Object.keys(responses);
    console.log("[RSVP API] Fetching guests for email notification:", guestIds);

    const { data: guests, error: fetchError } = await supabase
      .from("guests")
      .select("full_name, is_attending, email, contact_number, food_allergies")
      .in("id", guestIds);

    if (fetchError) {
      console.error("[RSVP API] Failed to fetch guests for email:", fetchError);
    }

    if (guests && guests.length > 0) {
      console.log(
        "[RSVP API] Sending email notification for",
        guests.length,
        "guest(s)"
      );

      const guestData = guests.map((g) => ({
        name: g.full_name,
        isAttending: g.is_attending,
        email: g.email,
        contactNumber: g.contact_number,
        foodAllergies: g.food_allergies
      }));

      // Send admin notification first, then guest confirmations (sequential to respect rate limits)
      // Must await — Vercel serverless terminates after response, killing fire-and-forget promises
      try {
        await sendRsvpNotification({ guests: guestData });
        await sendGuestConfirmation({ guests: guestData });
      } catch (err) {
        console.error("[RSVP API] Email notification error:", err);
      }
    } else {
      console.warn("[RSVP API] No guests found for email notification");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
