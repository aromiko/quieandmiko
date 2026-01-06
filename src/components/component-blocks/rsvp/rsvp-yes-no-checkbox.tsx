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
    <div className="space-y-2">
      <p className="font-medium">{guest.full_name}</p>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`yes-${guest.id}`}
            checked={value === true}
            onCheckedChange={(checked) => {
              if (checked === true) onChange(guest.id, true);
            }}
            className="size-6"
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
          />
          <Label htmlFor={`no-${guest.id}`} className="cursor-pointer">
            No
          </Label>
        </div>
      </div>
    </div>
  );
}
