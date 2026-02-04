import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("site_auth")?.value;
  const sitePassword = process.env.SITE_PASSWORD;

  // In development or if no password is set, allow access
  if (!sitePassword) {
    console.warn(
      "[Middleware]: SITE_PASSWORD environment variable is not set - allowing access"
    );
    return NextResponse.next();
  }

  if (!auth || auth !== sitePassword) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login(?:/.*)?|rsvp(?:/.*)?|api/|_next/|favicon.ico).*)"]
};
