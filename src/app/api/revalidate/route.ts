import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Contentful webhook endpoint for on-demand revalidation.
 *
 * Configure a webhook in Contentful (Settings → Webhooks) to POST to:
 *   https://quieandmiko.com/api/revalidate?secret=YOUR_REVALIDATION_SECRET
 *
 * Triggers: Publish, Unpublish (Entry & Asset)
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATION_SECRET) {
    console.error("[Revalidate] REVALIDATION_SECRET env variable is not set");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  // Revalidate the entire route tree — covers all Contentful-backed pages:
  // /, /rsvp, /rsvp/[code], and any [...slug] pages
  revalidatePath("/", "layout");

  console.log(
    "[Revalidate] Cache purged for all pages at",
    new Date().toISOString()
  );

  return NextResponse.json({ revalidated: true });
}
