"use client";

import Monogram from "@/app/assets/images/logo/QM3.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      toast.error("Wrong password.");
    }
  }

  return (
    <main>
      <section className="mx-auto flex h-screen max-w-4xl items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <Monogram />
          <div className="mt-10 flex gap-4">
            <Label htmlFor="rsvp-code-input">Password:</Label>
            <Input
              id="page-password"
              placeholder="Enter password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Enter</Button>
        </form>
      </section>
    </main>
  );
}
