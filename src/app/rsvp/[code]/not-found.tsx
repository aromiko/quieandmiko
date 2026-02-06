import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function RsvpNotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
      <section className="relative mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-16">
        {/* Main card */}
        <div
          className="relative w-full overflow-hidden rounded-2xl border shadow-xl"
          style={{
            backgroundImage: `url(https://images.ctfassets.net/jfr6f08fp6u3/7doujVt2cqlm7Sbo1zFBY5/5c2820d3334491d5759bca2523621142/TextureRSVP-Card.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Overlay for text contrast */}
          <div className="absolute inset-0 bg-white/90" />

          {/* Content wrapper */}
          <div className="relative z-10 p-8 text-center sm:p-12">
            {/* Top decorative line */}
            <div className="bg-wine/40 absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-b-full" />

            {/* Icon */}
            <div className="bg-wine/10 mx-auto mb-6 flex size-16 items-center justify-center rounded-full">
              <AlertCircle className="text-wine size-8" />
            </div>

            {/* Header */}
            <h1 className="text-coffee mb-3 font-serif text-3xl">
              Code Not Found
            </h1>
            <p className="mx-auto mb-6 max-w-sm text-neutral-600">
              We couldn&apos;t find a guest matching that RSVP code. This may
              happen if the link is incorrect or has expired.
            </p>

            {/* Suggestions */}
            <div className="mb-8 rounded-xl bg-neutral-100/80 p-4 text-left">
              <p className="mb-2 text-sm font-medium text-neutral-700">
                <Search className="mr-2 inline size-4" />
                Try the following:
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Double-check the code on your invitation</li>
                <li>• Make sure there are no extra spaces</li>
                <li>• Enter the code manually below</li>
              </ul>
            </div>

            {/* Action button */}
            <Button
              asChild
              className="bg-wine hover:bg-wine/90 h-12 w-full rounded-xl"
            >
              <Link href="/rsvp">
                <ArrowLeft className="mr-2 size-4" />
                Back to RSVP Page
              </Link>
            </Button>

            {/* Help text */}
            <p className="mt-6 text-xs text-neutral-500">
              Still having trouble? Contact us for assistance.
            </p>

            {/* Bottom decorative line */}
            <div className="bg-wine/40 absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-t-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
