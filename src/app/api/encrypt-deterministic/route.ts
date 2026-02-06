import { generateDeterministicCode } from "@/lib/utils/crypto";
import { NextRequest, NextResponse } from "next/server";

// Max length for RSVP codes to prevent abuse
const MAX_CODE_LENGTH = 100;

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    // Validate input length to prevent abuse
    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json({ error: "Code too long" }, { status: 400 });
    }

    const encrypted = generateDeterministicCode(code.trim());
    return NextResponse.json({ encrypted });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
