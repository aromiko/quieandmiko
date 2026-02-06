"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/classnames";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RsvpCodeForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Please enter a valid RSVP code.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/encrypt-deterministic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.encrypted) {
        toast.error("Failed to encrypt RSVP code.");
        setLoading(false);
        return;
      }

      router.push(`/rsvp/${data.encrypted}`);
    } catch {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-16">
      {/* Decorative background pattern */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-wine font-serif text-[20rem] leading-none">&</div>
      </div>

      {/* Main card */}
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-xl sm:p-12"
        style={{
          backgroundImage: `url(https://images.ctfassets.net/jfr6f08fp6u3/7doujVt2cqlm7Sbo1zFBY5/5c2820d3334491d5759bca2523621142/TextureRSVP-Card.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-white/85" />

        {/* Content wrapper */}
        <div className="relative z-10 p-8 sm:p-12">
          {/* Top decorative line */}
          <div className="bg-wine/40 absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-b-full" />

          {/* Header */}
          <div className="mb-8 space-y-3 text-center">
            <div className="bg-wine/15 text-wine mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
              <Sparkles className="size-6" />
            </div>
            <h2 className="text-coffee font-serif text-2xl sm:text-3xl">
              Welcome, Dear Guest
            </h2>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-neutral-600">
              Please enter the unique RSVP code from your invitation to access
              your personalized response form.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="rsvp-code-input"
                className="text-coffee text-sm font-medium"
              >
                Your RSVP Code
              </Label>
              <Input
                id="rsvp-code-input"
                placeholder="e.g., ABC123"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className={cn(
                  "text-coffee h-14 rounded-xl border-neutral-300 bg-white text-center font-mono text-lg tracking-widest",
                  "placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-neutral-400",
                  "focus:border-wine focus:ring-wine/20 uppercase"
                )}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !code.trim()}
              className="bg-wine hover:bg-wine/90 h-12 w-full rounded-xl text-base font-medium transition-all"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  Continue to RSVP
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </form>

          {/* Bottom decorative text */}
          <p className="mt-8 text-center text-xs text-neutral-500">
            Can&apos;t find your code? Check your invitation card or contact us.
          </p>

          {/* Bottom decorative line */}
          <div className="bg-wine/40 absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-t-full" />
        </div>
      </div>
    </section>
  );
}
