import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="bg-cream flex min-h-screen items-center justify-center p-6">
      <section className="relative mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-16">
        {/* Main card */}
        <div
          className="relative w-full overflow-hidden rounded-2xl border shadow-2xl"
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
            <div className="bg-wine/40 absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-b-full" />

            {/* Large 404 */}
            <div className="mb-4 select-none">
              <span className="text-wine/20 font-serif text-8xl font-light tracking-tight sm:text-9xl">
                404
              </span>
            </div>

            {/* Decorative ampersand */}
            <div className="text-wine/10 font-script pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] leading-none">
              &
            </div>

            {/* Header */}
            <h1 className="text-coffee relative mb-3 font-serif text-3xl sm:text-4xl">
              Page Not Found
            </h1>
            <p className="relative mx-auto mb-8 max-w-sm text-neutral-600">
              Oops! It seems you&apos;ve wandered off the path. The page
              you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>

            {/* Decorative divider */}
            <div className="relative mx-auto mb-8 flex items-center justify-center gap-3">
              <div className="bg-wine/30 h-px w-16" />
              <span className="text-wine/50 font-serif text-xl">&</span>
              <div className="bg-wine/30 h-px w-16" />
            </div>

            {/* Action buttons */}
            <div className="relative flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="bg-wine hover:bg-wine/90 h-12 rounded-xl px-6"
              >
                <Link href="/">
                  <Home className="mr-2 size-4" />
                  Return Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-wine/30 text-wine hover:text-wine hover:bg-wine/5 h-12 rounded-xl px-6"
              >
                <Link href="/rsvp">
                  <ArrowLeft className="mr-2 size-4" />
                  Go to RSVP
                </Link>
              </Button>
            </div>

            {/* Help text */}
            <p className="relative mt-8 text-xs text-neutral-500">
              If you believe this is an error, please contact us.
            </p>

            {/* Bottom decorative line */}
            <div className="bg-wine/40 absolute bottom-0 left-1/2 h-1 w-32 -translate-x-1/2 rounded-t-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
