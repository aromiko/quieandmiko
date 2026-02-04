import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("site_auth")?.value;
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    console.error(
      "[Middleware]: SITE_PASSWORD environment variable is not set"
    );
    return new NextResponse("Internal Server Error", { status: 500 });
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
