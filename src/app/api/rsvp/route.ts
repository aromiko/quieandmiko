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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
