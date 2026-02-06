"use client";

import RsvpYesNoCheckbox from "@/components/component-blocks/rsvp/rsvp-yes-no-checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/classnames";
import { Hotel, Ticket, User, Users } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Guest {
  id: number;
  full_name: string;
  is_attending: boolean | null;
  is_adult: boolean;
  guest_type:
    | "guest"
    | "primary_sponsor"
    | "entourage"
    | "best_man"
    | "maid_of_honor"
    | "mother"
    | "father";
  email: string | null;
  contact_number: string | null;
  food_allergies: string | null;
  has_hotel_booking: boolean | null;
}

interface ContactInfo {
  email: string;
  contact_number: string;
  food_allergies: string;
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

  // Contact info state for adult guests only
  const [contactInfo, setContactInfo] = useState<Record<number, ContactInfo>>(
    () => {
      const allGuests = [primaryGuest, ...groupGuests];
      const map: Record<number, ContactInfo> = {};

      allGuests.forEach((g) => {
        if (g.is_adult) {
          map[g.id] = {
            email: g.email || "",
            contact_number: g.contact_number || "",
            food_allergies: g.food_allergies || ""
          };
        }
      });

      return map;
    }
  );

  const hasChanges = useMemo(() => {
    const allGuests = [primaryGuest, ...groupGuests];

    // Check attendance changes
    const attendanceChanged = Object.keys(originalResponses).some((key) => {
      const id = Number(key);
      return originalResponses[id] !== responses[id];
    });

    // Check contact info changes for adults
    const contactChanged = allGuests.some((g) => {
      if (!g.is_adult) return false;
      const current = contactInfo[g.id];
      return (
        current?.email !== (g.email || "") ||
        current?.contact_number !== (g.contact_number || "") ||
        current?.food_allergies !== (g.food_allergies || "")
      );
    });

    return attendanceChanged || contactChanged;
  }, [originalResponses, responses, contactInfo, primaryGuest, groupGuests]);

  // Only require primary guest to answer - group members are optional
  const primaryUnanswered = useMemo(() => {
    return responses[primaryGuest.id] === null;
  }, [responses, primaryGuest.id]);

  // Check if attending adults have missing required contact info
  const missingContactInfo = useMemo(() => {
    const allGuests = [primaryGuest, ...groupGuests];
    return allGuests.some((g) => {
      // Only check adults who are attending
      if (!g.is_adult || responses[g.id] !== true) return false;
      const info = contactInfo[g.id];
      return !info?.email?.trim() || !info?.contact_number?.trim();
    });
  }, [responses, contactInfo, primaryGuest, groupGuests]);

  const handleChange = (id: number, value: boolean) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleContactChange = (
    id: number,
    field: keyof ContactInfo,
    value: string
  ) => {
    setContactInfo((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify({ responses, contactInfo }),
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

  const getGuestTypeLabel = (type: Guest["guest_type"]) => {
    switch (type) {
      case "primary_sponsor":
        return "Principal Sponsor";
      case "entourage":
        return "Entourage";
      case "best_man":
        return "Best Man";
      case "maid_of_honor":
        return "Maid of Honor";
      case "mother":
        return "Mother";
      case "father":
        return "Father";
      default:
        return null;
    }
  };

  const renderGuestCard = (guest: Guest, isPrimary = false) => {
    const typeLabel = getGuestTypeLabel(guest.guest_type);
    const isAttending = responses[guest.id] === true;

    return (
      <div
        key={guest.id}
        className={cn(
          "w-full space-y-4 rounded-lg border p-6 transition-colors",
          isPrimary
            ? "border-wine/30 bg-wine/5"
            : "border-neutral-200 bg-white/50"
        )}
      >
        {(isPrimary || typeLabel || !guest.is_adult) && (
          <div className="flex flex-wrap items-center gap-2">
            {isPrimary && (
              <Badge variant="default" className="bg-wine text-cream">
                <User className="size-3" />
                You
              </Badge>
            )}
            {typeLabel && <Badge variant="secondary">{typeLabel}</Badge>}
            {!guest.is_adult && (
              <Badge variant="outline" className="bg-matcha text-cream">
                Child
              </Badge>
            )}
          </div>
        )}

        <RsvpYesNoCheckbox
          guest={guest}
          value={responses[guest.id]}
          onChange={handleChange}
        />

        {/* Show contact fields only for adults who are attending - accordion style */}
        {guest.is_adult && (
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              isAttending
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div>
                <p className="mt-4 px-2 text-base text-neutral-600">
                  Please provide contact details{" "}
                  <span className="text-destructive">*</span>
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1 p-2">
                    <Label htmlFor={`email-${guest.id}`} className="text-base">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={`email-${guest.id}`}
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={contactInfo[guest.id]?.email || ""}
                      onChange={(e) =>
                        handleContactChange(guest.id, "email", e.target.value)
                      }
                      className={cn(
                        "transition-colors",
                        !contactInfo[guest.id]?.email?.trim() &&
                          "border-destructive"
                      )}
                    />
                  </div>
                  <div className="space-y-1 p-2">
                    <Label
                      htmlFor={`contact-${guest.id}`}
                      className="text-base"
                    >
                      Contact Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={`contact-${guest.id}`}
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      required
                      value={contactInfo[guest.id]?.contact_number || ""}
                      onChange={(e) =>
                        handleContactChange(
                          guest.id,
                          "contact_number",
                          e.target.value
                        )
                      }
                      className={cn(
                        "z-10 transition-colors",
                        !contactInfo[guest.id]?.contact_number?.trim() &&
                          "border-destructive"
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-1 p-2">
                  <Label
                    htmlFor={`allergies-${guest.id}`}
                    className="text-base"
                  >
                    Food Allergies{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id={`allergies-${guest.id}`}
                    type="text"
                    placeholder="e.g., Nuts, Seafood, Dairy..."
                    value={contactInfo[guest.id]?.food_allergies || ""}
                    onChange={(e) =>
                      handleContactChange(
                        guest.id,
                        "food_allergies",
                        e.target.value
                      )
                    }
                    className="transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Check if primary guest has hotel booking
  const hasHotelBooking = primaryGuest.has_hotel_booking === true;

  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-8 p-6">
      {/* Museum Ticket Image */}
      <div className="relative aspect-[2.8/1] w-full">
        <Image
          src="https://images.ctfassets.net/jfr6f08fp6u3/FdVOOzkEayR63cgYhPD0L/2ef980d9801d2f47b5302a53c8f63d74/TicketMuseum-Ticket.png"
          alt="Wedding Ticket"
          fill
          className="rounded-lg object-cover shadow-lg"
          priority
        />
      </div>

      {/* Reserved Seats Notice */}
      <div className="w-full space-y-4 text-center">
        {/* Ticket icon */}
        <div className="bg-wine/10 mx-auto flex size-12 items-center justify-center rounded-full">
          <Ticket className="text-wine size-6" />
        </div>

        {/* Main message */}
        <div>
          <p className="text-coffee font-serif text-xl sm:text-2xl">
            We have reserved{" "}
            <span className="text-wine font-bold">
              {groupGuests.length + 1} seat
              {groupGuests.length + 1 > 1 ? "s" : ""}
            </span>{" "}
            in your honor.
          </p>

          {groupGuests.length > 0 && (
            <p className="text-coffee/70 mt-2 text-sm">
              For you and your group
            </p>
          )}
        </div>

        {/* Hotel Booking Notice for Primary Sponsors */}
        {hasHotelBooking && (
          <div className="mx-auto w-full max-w-md">
            <div className="border-wine/20 bg-wine/5 rounded-lg border px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="bg-wine/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                  <Hotel className="text-wine size-4" />
                </div>
                <div className="text-left">
                  <p className="text-coffee text-sm font-medium">
                    Hotel Accommodation Included
                  </p>
                  <p className="text-coffee/70 mt-0.5 text-xs leading-relaxed">
                    We&apos;ve booked a room for you. Details will be sent one
                    month before the wedding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Guest Section - "Your RSVP" */}
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2">
          <User className="text-wine size-5" />
          <h2 className="font-serif text-lg font-medium">Your RSVP</h2>
        </div>
        <p className="text-muted-foreground mb-0 text-base">
          You are RSVPing as:
        </p>

        {renderGuestCard(primaryGuest, true)}
      </div>

      {/* Group Members Section - "Your Group" */}
      {groupGuests.length > 0 && (
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 border-t border-neutral-200 pt-6">
            <Users className="size-5 text-neutral-500" />
            <h2 className="font-serif text-lg font-medium">Your Group</h2>
            <Badge variant="outline" className="ml-auto">
              Optional
            </Badge>
          </div>
          <p className="text-muted-foreground text-base">
            RSVP on behalf of other members in{" "}
            {groupLabel && (
              <strong className="text-foreground">{groupLabel}</strong>
            )}
          </p>

          <div className="space-y-3">
            {groupGuests.map((guest) => renderGuestCard(guest, false))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="w-full space-y-4 rounded-lg border border-neutral-200 bg-white/50 p-4 text-center">
        <p aria-live="polite" className="text-muted-foreground text-base">
          {"You've confirmed "}
          <strong className="text-wine font-mono text-lg">
            {Object.values(responses).filter((v) => v === true).length}
          </strong>{" "}
          out of <strong className="font-mono">{groupGuests.length + 1}</strong>{" "}
          guests attending.
        </p>

        <div
          className={cn(
            "grid transition-all duration-200 ease-in-out",
            primaryUnanswered || missingContactInfo
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            {primaryUnanswered && (
              <p role="alert" className="text-destructive py-1 text-base">
                Please select Yes or No for yourself.
              </p>
            )}

            {missingContactInfo && !primaryUnanswered && (
              <p role="alert" className="text-destructive py-1 text-base">
                Please fill in email and contact number for all attending
                adults.
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={
            loading || primaryUnanswered || missingContactInfo || !hasChanges
          }
          className="w-full sm:w-auto"
        >
          {loading ? "Submitting..." : "Submit RSVP"}
        </Button>
      </div>
    </section>
  );
}
