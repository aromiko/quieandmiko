import { NextResponse } from "next/server";

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

  res.cookies.set("site_auth", password, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/"
  });

  return res;
}
