"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Database } from "@/lib/types";
import { Copy, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Guest = Database["public"]["Tables"]["guests"]["Row"];

interface Group {
  group_id: string;
  group_label: string;
}

interface GuestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest?: Guest | null;
  onSuccess: () => void;
}

const GUEST_TYPES = [
  { value: "guest", label: "Guest" },
  { value: "primary_sponsor", label: "Principal Sponsor" },
  { value: "entourage", label: "Entourage" },
  { value: "best_man", label: "Best Man" },
  { value: "maid_of_honor", label: "Maid of Honor" },
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" }
];

export default function GuestFormDialog({
  open,
  onOpenChange,
  guest,
  onSuccess
}: GuestFormDialogProps) {
  const isEditing = !!guest;

  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [guestType, setGuestType] = useState("guest");
  const [isAdult, setIsAdult] = useState(true);
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [foodAllergies, setFoodAllergies] = useState("");
  const [hasHotelBooking, setHasHotelBooking] = useState(false);
  const [groupSelection, setGroupSelection] = useState<string>("new");
  const [newGroupLabel, setNewGroupLabel] = useState("");
  const [rsvpCode, setRsvpCode] = useState("");

  // Fetch groups on open
  useEffect(() => {
    if (open) {
      fetchGroups();

      if (guest) {
        // Populate form with guest data
        setFullName(guest.full_name);
        setGuestType(guest.guest_type || "guest");
        setIsAdult(guest.is_adult ?? true);
        setEmail(guest.email || "");
        setContactNumber(guest.contact_number || "");
        setFoodAllergies(guest.food_allergies || "");
        setHasHotelBooking(guest.has_hotel_booking ?? false);
        setGroupSelection(guest.group_id || "new");
        setNewGroupLabel(guest.group_label || "");
        setRsvpCode(guest.rsvp_code || "");
      } else {
        // Reset form
        resetForm();
      }
    }
  }, [open, guest]);

  const fetchGroups = async () => {
    setLoadingGroups(true);
    try {
      const res = await fetch("/api/admin/guests");
      const data = await res.json();
      setGroups(data.groups || []);
    } catch {
      console.error("Failed to fetch groups");
    }
    setLoadingGroups(false);
  };

  const resetForm = () => {
    setFullName("");
    setGuestType("guest");
    setIsAdult(true);
    setEmail("");
    setContactNumber("");
    setFoodAllergies("");
    setHasHotelBooking(false);
    setGroupSelection("new");
    setNewGroupLabel("");
    setRsvpCode("");
  };

  const copyRsvpCode = () => {
    if (rsvpCode) {
      navigator.clipboard.writeText(rsvpCode);
      toast.success("RSVP code copied!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    setLoading(true);

    const isNewGroup = groupSelection === "new";
    const payload = {
      id: guest?.id,
      full_name: fullName,
      guest_type: guestType,
      is_adult: isAdult,
      email: email || null,
      contact_number: contactNumber || null,
      food_allergies: foodAllergies || null,
      has_hotel_booking: hasHotelBooking || null,
      group_id: isNewGroup ? null : groupSelection,
      group_label: isNewGroup ? newGroupLabel : null,
      create_new_group: isNewGroup,
      rsvp_code: isEditing ? rsvpCode.toUpperCase() : undefined
    };

    try {
      const res = await fetch("/api/admin/guests", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save guest");
        setLoading(false);
        return;
      }

      toast.success(isEditing ? "Guest updated!" : "Guest added!");
      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {isEditing ? "Edit Guest" : "Add New Guest"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the guest information below."
              : "Fill in the details to add a new guest."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Dela Cruz"
              required
            />
          </div>

          {/* RSVP Code - Only show when editing */}
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="rsvp_code">RSVP Code</Label>
              <div className="flex gap-2">
                <Input
                  id="rsvp_code"
                  type="text"
                  value={rsvpCode}
                  onChange={(e) => setRsvpCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  maxLength={10}
                  className="font-mono uppercase"
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={copyRsvpCode}
                  title="Copy RSVP code"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Warning: Changing this will invalidate any existing QR codes and
                links sent to the guest.
              </p>
            </div>
          )}

          {/* Guest Type */}
          <div className="space-y-2">
            <Label htmlFor="guest_type">Guest Type</Label>
            <Select value={guestType} onValueChange={setGuestType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {GUEST_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Group Selection */}
          <div className="space-y-2">
            <Label htmlFor="group">Group</Label>
            <Select
              value={groupSelection}
              onValueChange={setGroupSelection}
              disabled={loadingGroups}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select or create group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">+ Create New Group</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group.group_id} value={group.group_id}>
                    {group.group_label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Group Label (only if creating new) */}
          {groupSelection === "new" && (
            <div className="space-y-2">
              <Label htmlFor="new_group_label">
                Group Name{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="new_group_label"
                value={newGroupLabel}
                onChange={(e) => setNewGroupLabel(e.target.value)}
                placeholder="e.g., Dela Cruz Family"
              />
              <p className="text-muted-foreground text-xs">
                Guests in the same group can RSVP for each other.
              </p>
            </div>
          )}

          {/* Is Adult */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_adult"
              checked={isAdult}
              onCheckedChange={(checked) => setIsAdult(checked === true)}
            />
            <Label htmlFor="is_adult" className="font-normal">
              Adult (18+)
            </Label>
          </div>

          {/* Has Hotel Booking */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_hotel_booking"
              checked={hasHotelBooking}
              onCheckedChange={(checked) =>
                setHasHotelBooking(checked === true)
              }
            />
            <Label htmlFor="has_hotel_booking" className="font-normal">
              Hotel accommodation provided
            </Label>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              id="contact_number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="+63 9XX XXX XXXX"
            />
          </div>

          {/* Food Allergies */}
          <div className="space-y-2">
            <Label htmlFor="food_allergies">Food Allergies</Label>
            <Input
              id="food_allergies"
              value={foodAllergies}
              onChange={(e) => setFoodAllergies(e.target.value)}
              placeholder="e.g., Nuts, Seafood"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Add Guest"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
