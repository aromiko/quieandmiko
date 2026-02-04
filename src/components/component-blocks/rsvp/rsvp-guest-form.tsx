"use client";

import RsvpYesNoCheckbox from "@/components/component-blocks/rsvp/rsvp-yes-no-checkbox";
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
  const [originalResponses, setOriginalResponses] = useState<
    Record<number, boolean | null>
  >(() => {
    const map: Record<number, boolean | null> = {
      [primaryGuest.id]: primaryGuest.is_attending
    };

    groupGuests.forEach((g) => {
      map[g.id] = g.is_attending;
    });

    return map;
  });

  const [responses, setResponses] = useState(originalResponses);
  const [loading, setLoading] = useState(false);

  const hasChanges = useMemo(() => {
    return Object.keys(originalResponses).some((key) => {
      const id = Number(key);
      return originalResponses[id] !== responses[id];
    });
  }, [originalResponses, responses]);

  const hasUnanswered = useMemo(() => {
    return Object.values(responses).some((val) => val === null);
  }, [responses]);

  const handleChange = (id: number, value: boolean) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value
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
      setOriginalResponses({ ...responses });
    }

    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 lang="fr">{"Répondez s'il vous plaît"}</h1>

      <div className="space-y-2">
        <p>
          You are RSVPing as <strong>{primaryGuest.full_name}</strong>
        </p>

        <RsvpYesNoCheckbox
          guest={primaryGuest}
          value={responses[primaryGuest.id]}
          onChange={handleChange}
        />
      </div>

      {groupGuests.length > 0 && (
        <div className="space-y-4">
          <p className="mt-4">
            You can also RSVP for other members of your group{" "}
            {groupLabel && <strong>{groupLabel}</strong>}
          </p>

          {groupGuests.map((guest) => (
            <div key={guest.id}>
              {" "}
              <RsvpYesNoCheckbox
                guest={guest}
                value={responses[guest.id]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      )}

      <p aria-live="polite" className="text-muted-foreground text-base">
        {"You've confirmed "}
        <strong className="font-mono">
          {Object.values(responses).filter((v) => v === true).length}
        </strong>{" "}
        out of <strong className="font-mono">{groupGuests.length + 1}</strong>{" "}
        guests attending.
      </p>

      {hasUnanswered && (
        <p role="alert" className="text-destructive text-sm">
          Please select Yes or No for all guests.
        </p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading || hasUnanswered || !hasChanges}
      >
        {loading ? "Submitting..." : "Submit RSVP"}
      </Button>
    </section>
  );
}
