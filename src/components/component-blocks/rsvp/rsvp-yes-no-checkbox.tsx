"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Guest {
  id: number;
  full_name: string;
}

interface RsvpYesNoCheckboxProps {
  guest: Guest;
  value: boolean | null;
  onChange: (guestId: number, value: boolean) => void;
}

export default function RsvpYesNoCheckbox({
  guest,
  value,
  onChange
}: RsvpYesNoCheckboxProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="font-medium">{guest.full_name}</legend>

      <div
        className="flex items-center space-x-6"
        role="group"
        aria-label={`RSVP response for ${guest.full_name}`}
      >
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`yes-${guest.id}`}
            checked={value === true}
            onCheckedChange={(checked) => {
              if (checked === true) onChange(guest.id, true);
            }}
            className="size-6"
            aria-describedby={`rsvp-status-${guest.id}`}
          />
          <Label htmlFor={`yes-${guest.id}`} className="cursor-pointer">
            Yes
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`no-${guest.id}`}
            checked={value === false}
            onCheckedChange={(checked) => {
              if (checked === true) onChange(guest.id, false);
            }}
            className="size-6"
            aria-describedby={`rsvp-status-${guest.id}`}
          />
          <Label htmlFor={`no-${guest.id}`} className="cursor-pointer">
            No
          </Label>
        </div>
      </div>
      <span id={`rsvp-status-${guest.id}`} className="sr-only">
        {value === null
          ? "No response selected"
          : value
            ? "Attending"
            : "Not attending"}
      </span>
    </fieldset>
  );
}
