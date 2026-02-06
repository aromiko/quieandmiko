import { getAuthUser } from "@/lib/services/supabase-auth-server";
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Helper to generate a unique RSVP code
function generateRsvpCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET - Fetch all groups for dropdown
export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();

  // Get unique groups
  const { data: guests } = await supabase
    .from("guests")
    .select("group_id, group_label")
    .not("group_label", "is", null);

  if (!guests) {
    return NextResponse.json({ groups: [] });
  }

  // Deduplicate groups
  const groupMap = new Map<string, string>();
  guests.forEach((g) => {
    if (g.group_id && g.group_label && !groupMap.has(g.group_id)) {
      groupMap.set(g.group_id, g.group_label);
    }
  });

  const groups = Array.from(groupMap.entries()).map(([id, label]) => ({
    group_id: id,
    group_label: label
  }));

  return NextResponse.json({ groups });
}

// POST - Create a new guest
export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      full_name,
      guest_type,
      is_adult,
      email,
      contact_number,
      food_allergies,
      has_hotel_booking,
      group_id,
      group_label,
      create_new_group
    } = body;

    if (!full_name?.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    // Determine group_id
    let finalGroupId = group_id;
    let finalGroupLabel = group_label;

    if (create_new_group || !group_id) {
      // Generate new group_id
      finalGroupId = uuidv4();
      finalGroupLabel = group_label || null;
    } else {
      // Use existing group - fetch the label
      const { data: existingGroup } = await supabase
        .from("guests")
        .select("group_label")
        .eq("group_id", group_id)
        .limit(1)
        .single();

      finalGroupLabel = existingGroup?.group_label || group_label;
    }

    // Generate unique RSVP code
    let rsvpCode = generateRsvpCode();

    // Check for uniqueness
    const { data: existing } = await supabase
      .from("guests")
      .select("id")
      .eq("rsvp_code", rsvpCode);

    if (existing && existing.length > 0) {
      rsvpCode = generateRsvpCode(); // Try again
    }

    const { data, error } = await supabase
      .from("guests")
      .insert({
        full_name: full_name.trim(),
        guest_type: guest_type || "guest",
        is_adult: is_adult ?? true,
        email: email?.trim() || null,
        contact_number: contact_number?.trim() || null,
        food_allergies: food_allergies?.trim() || null,
        has_hotel_booking: has_hotel_booking ?? null,
        group_id: finalGroupId,
        group_label: finalGroupLabel,
        rsvp_code: rsvpCode,
        is_attending: null
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating guest:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ guest: data });
  } catch (error) {
    console.error("Error in POST /api/admin/guests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update a guest
export async function PUT(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      full_name,
      guest_type,
      is_adult,
      email,
      contact_number,
      food_allergies,
      has_hotel_booking,
      group_id,
      group_label,
      create_new_group,
      rsvp_code
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }

    if (!full_name?.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    // If rsvp_code is being updated, check for uniqueness
    if (rsvp_code) {
      const { data: existingWithCode } = await supabase
        .from("guests")
        .select("id")
        .eq("rsvp_code", rsvp_code.toUpperCase())
        .neq("id", id);

      if (existingWithCode && existingWithCode.length > 0) {
        return NextResponse.json(
          { error: "This RSVP code is already in use by another guest" },
          { status: 400 }
        );
      }
    }

    // Determine group_id
    let finalGroupId = group_id;
    let finalGroupLabel = group_label;

    if (create_new_group) {
      // Generate new group_id
      finalGroupId = uuidv4();
      finalGroupLabel = group_label || null;
    } else if (group_id) {
      // Use existing group - fetch the label if not provided
      if (!group_label) {
        const { data: existingGroup } = await supabase
          .from("guests")
          .select("group_label")
          .eq("group_id", group_id)
          .limit(1)
          .single();

        finalGroupLabel = existingGroup?.group_label || null;
      }
    }

    const updateData: Record<string, unknown> = {
      full_name: full_name.trim(),
      guest_type: guest_type || "guest",
      is_adult: is_adult ?? true,
      email: email?.trim() || null,
      contact_number: contact_number?.trim() || null,
      food_allergies: food_allergies?.trim() || null,
      has_hotel_booking: has_hotel_booking ?? null,
      group_id: finalGroupId,
      group_label: finalGroupLabel,
      updated_at: new Date().toISOString()
    };

    // Only update rsvp_code if explicitly provided
    if (rsvp_code) {
      updateData.rsvp_code = rsvp_code.toUpperCase();
    }

    const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating guest:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ guest: data });
  } catch (error) {
    console.error("Error in PUT /api/admin/guests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a guest
export async function DELETE(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("id", parseInt(id, 10));

    if (error) {
      console.error("Error deleting guest:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/admin/guests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
