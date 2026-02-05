"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RsvpCodeForm() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Please enter a valid RSVP code.");
      return;
    }

    try {
      const res = await fetch("/api/encrypt-deterministic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.encrypted) {
        toast.error("Failed to encrypt RSVP code.");
        return;
      }

      router.push(`/rsvp/${data.encrypted}`);
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center space-y-6 p-6">
      <h1>{"Répondez s'il vous plaît"}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-6"
      >
        <Label htmlFor="rsvp-code-input">
          Please input the provided RSVP code:
        </Label>
        <Input
          id="rsvp-code-input"
          placeholder="Enter RSVP Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit">Continue</Button>
      </form>
    </section>
  );
}
