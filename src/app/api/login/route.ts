import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.SITE_PASSWORD) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("site_auth", password, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/"
  });

  return res;
}
