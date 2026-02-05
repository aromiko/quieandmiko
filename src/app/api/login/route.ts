import * as crypto from "crypto";
import { NextResponse } from "next/server";

// Generate a secure session token instead of storing password
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export async function POST(req: Request) {
  const { password } = await req.json();
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    console.error("[Login API]: SITE_PASSWORD environment variable is not set");
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  if (password !== sitePassword) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const sessionToken = generateSessionToken();

  res.cookies.set("site_auth", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return res;
}
