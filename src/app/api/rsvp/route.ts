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

export async function POST(req: Request) {
  const body = await req.json();

  const { responses }: { responses: Record<string, boolean> } = body;

  if (!responses || typeof responses !== "object") {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }

  try {
    const updates = await Promise.all(
      Object.entries(responses).map(([id, is_attending]) =>
        supabase.from("guests").update({ is_attending }).eq("id", id)
      )
    );

    const hasError = updates.some((res) => res.error);

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
