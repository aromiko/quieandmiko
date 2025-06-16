"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface GuestCheckboxProps {
  id: number;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function RsvpGuestCheckbox({
  id,
  name,
  checked,
  onChange
}: GuestCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center space-x-2">
      <Checkbox
        id={`cb-${id}`}
        checked={checked}
        onCheckedChange={(checked: boolean | "indeterminate") =>
          onChange(Boolean(checked))
        }
      />
      <span>{name}</span>
    </label>
  );
}
