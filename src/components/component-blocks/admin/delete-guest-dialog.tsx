"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Database } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Guest = Database["public"]["Tables"]["guests"]["Row"];

interface DeleteGuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest: Guest | null;
  onSuccess: () => void;
}

export default function DeleteGuestDialog({
  open,
  onOpenChange,
  guest,
  onSuccess
}: DeleteGuestDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!guest) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/guests?id=${guest.id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete guest");
        setLoading(false);
        return;
      }

      toast.success("Guest deleted");
      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Guest</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{guest?.full_name}</span>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
