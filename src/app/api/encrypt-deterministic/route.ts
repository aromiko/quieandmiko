import { generateDeterministicCode } from "@/lib/utils/crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const encrypted = generateDeterministicCode(code);
  return NextResponse.json({ encrypted });
}
