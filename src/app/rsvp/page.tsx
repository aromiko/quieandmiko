"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RsvpCodePage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast("Please enter your RSVP code.");
      return;
    }

    router.push(`/rsvp/${code.trim()}`);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1>RSVP</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p>Enter your RSVP code to continue:</p>
        <Input
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}
