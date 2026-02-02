import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("site_auth")?.value;

  if (!auth || auth !== process.env.SITE_PASSWORD) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login(?:/.*)?|rsvp(?:/.*)?|api/|_next/|favicon.ico).*)"]
};
