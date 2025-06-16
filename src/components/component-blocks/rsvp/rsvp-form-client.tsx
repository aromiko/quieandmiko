"use client";

import RsvpGuestCheckbox from "@/components/component-blocks/rsvp/rsvp-guest-checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Guest {
  id: number;
  full_name: string;
  is_attending: boolean | null;
}

export default function RsvpClientForm({
  primaryGuest,
  groupGuests,
  groupLabel
}: {
  primaryGuest: Guest;
  groupGuests: Guest[];
  groupLabel: string | null;
}) {
  const [responses, setResponses] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {
      [primaryGuest.id.toString()]: primaryGuest.is_attending ?? false
    };
    groupGuests.forEach((g) => {
      init[g.id.toString()] = g.is_attending ?? false;
    });
    return init;
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (id: number, checked: boolean) => {
    setResponses((prev) => ({
      ...prev,
      [id.toString()]: checked
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify({ responses }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      toast.error("Failed to submit RSVP.");
    } else {
      toast.success("RSVP submitted!");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">RSVP</h1>

      <div className="space-y-2">
        <p>
          You are RSVPing as <strong>{primaryGuest.full_name}</strong>
        </p>
        <RsvpGuestCheckbox
          id={primaryGuest.id}
          name={primaryGuest.full_name}
          checked={responses[primaryGuest.id.toString()]}
          onChange={(checked) => handleChange(primaryGuest.id, checked)}
        />
      </div>

      {groupGuests.length > 0 && (
        <div className="space-y-2">
          <p className="mt-4 text-muted-foreground">
            {`You can also RSVP for other members of your group ${groupLabel}:`}
          </p>
          {groupGuests.map((guest) => (
            <RsvpGuestCheckbox
              key={guest.id}
              id={guest.id}
              name={guest.full_name}
              checked={responses[guest.id.toString()]}
              onChange={(checked) => handleChange(guest.id, checked)}
            />
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {"You've confirmed for "}
        <strong>
          {Object.values(responses).filter((val) => val).length}
        </strong>{" "}
        out of <strong>{groupGuests.length + 1}</strong> guests.
      </p>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit RSVP"}
      </Button>
    </div>
  );
}
