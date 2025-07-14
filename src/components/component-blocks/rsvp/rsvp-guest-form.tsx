"use client";

import RsvpGuestCheckbox from "@/components/component-blocks/rsvp/rsvp-guest-checkbox";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Guest {
  id: number;
  full_name: string;
  is_attending: boolean | null;
}

export default function RsvpGuestForm({
  primaryGuest,
  groupGuests,
  groupLabel
}: {
  primaryGuest: Guest;
  groupGuests: Guest[];
  groupLabel: string | null;
}) {
  const originalResponses = useMemo(() => {
    const map: Record<string, boolean> = {
      [primaryGuest.id.toString()]: primaryGuest.is_attending ?? false
    };
    groupGuests.forEach((g) => {
      map[g.id.toString()] = g.is_attending ?? false;
    });
    return map;
  }, [primaryGuest, groupGuests]);

  const [responses, setResponses] =
    useState<Record<string, boolean>>(originalResponses);
  const [loading, setLoading] = useState(false);

  const hasChanges = useMemo(() => {
    return Object.keys(originalResponses).some(
      (key) => originalResponses[key] !== responses[key]
    );
  }, [originalResponses, responses]);

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
      <h1>{"Répondez s'il vous plaît"}</h1>

      <div className="space-y-2">
        <p>
          You are RSVPing as <strong>{primaryGuest.full_name}</strong>
        </p>
        <RsvpGuestCheckbox
          id={primaryGuest.id}
          name={"Attending"}
          checked={responses[primaryGuest.id.toString()]}
          onChange={(checked) => handleChange(primaryGuest.id, checked)}
        />
      </div>

      {groupGuests.length > 0 && (
        <div className="space-y-2">
          <p className="mt-4">
            You can also RSVP for other members of your group{" "}
            {groupLabel && <strong>{groupLabel}</strong>}
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

      <p className="text-muted-foreground text-base">
        {"You've confirmed for "}
        <strong>
          {Object.values(responses).filter((val) => val).length}
        </strong>{" "}
        out of <strong>{groupGuests.length + 1}</strong> guests.
      </p>

      <Button onClick={handleSubmit} disabled={loading || !hasChanges}>
        {loading ? "Submitting..." : "Submit RSVP"}
      </Button>
    </div>
  );
}
