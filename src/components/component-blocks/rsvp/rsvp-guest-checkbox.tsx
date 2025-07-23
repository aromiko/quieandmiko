"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`cb-${id}`}
        checked={checked}
        onCheckedChange={(checked: boolean | "indeterminate") =>
          onChange(Boolean(checked))
        }
        className="size-6"
      />
      <Label htmlFor={`cb-${id}`} className="cursor-pointer">
        {name}
      </Label>
    </div>
  );
}
