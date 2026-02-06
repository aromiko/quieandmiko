// import { NextRequest, NextResponse } from "next/server";

// // Admin route requires additional check
// const ADMIN_PATHS = ["/admin"];

// export function middleware(req: NextRequest) {
//   const auth = req.cookies.get("site_auth")?.value;
//   const pathname = req.nextUrl.pathname;

//   // Skip password check if no auth cookie
//   if (!auth) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // Extra protection for admin routes - check for admin secret
//   if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
//     const adminSecret = process.env.ADMIN_SECRET;
//     const providedSecret = req.cookies.get("admin_auth")?.value;

//     if (adminSecret && providedSecret !== adminSecret) {
//       // Redirect to home if not authorized for admin
//       const url = req.nextUrl.clone();
//       url.pathname = "/";
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!login(?:/.*)?|rsvp(?:/.*)?|api/|_next/|favicon.ico).*)"]
// };
