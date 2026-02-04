"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

type Guest = Database["public"]["Tables"]["guests"]["Row"];

interface AdminDashboardProps {
  guests: Guest[];
}

export default function AdminDashboard({ guests }: AdminDashboardProps) {
  const [search, setSearch] = useState("");

  const generateRSVPLink = async (code: string): Promise<string> => {
    try {
      const res = await fetch("/api/encrypt-deterministic", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (!res.ok || !data.encrypted) throw new Error(data.error || "Failed");
      return `${window.location.origin}/rsvp/${data.encrypted}`;
    } catch {
      toast.error("Failed to generate link");
      return "#";
    }
  };

  return (
    <div className="container mx-auto space-y-4 p-6">
      <h1>Guest List</h1>
      <div>
        <label htmlFor="guest-search" className="sr-only">
          Search guests
        </label>
        <Input
          id="guest-search"
          placeholder="Search name or group"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search guests by name or group"
        />
      </div>
      <ul className="space-y-2" role="list" aria-label="Guest list">
        {guests
          .filter((g) =>
            g.full_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((guest) => (
            <li
              key={guest.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <div>
                <p className="font-medium">{guest.full_name}</p>
                <p className="text-muted-foreground text-sm">
                  Group: {guest.group_label || "N/A"}
                </p>
              </div>
              <Button
                onClick={async () => {
                  const url = await generateRSVPLink(guest.rsvp_code || "");
                  if (url !== "#") {
                    await navigator.clipboard.writeText(url);
                    toast.success("RSVP link copied!");
                  }
                }}
                disabled={!guest.rsvp_code}
              >
                Copy RSVP Link
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}
