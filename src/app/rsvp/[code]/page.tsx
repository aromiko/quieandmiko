import RsvpGuestForm from "@/components/component-blocks/rsvp/rsvp-guest-form";
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
import { generateDeterministicCode } from "@/lib/utils/crypto";
import { notFound } from "next/navigation";

export default async function RsvpPage({
  params
}: {
  params: Promise<{ code: string }>; // No need to await
}) {
  const { code } = await params;

  const supabase = await createSupabaseServerClient();

  // Get all guests and compare deterministic hashes
  const { data: guests } = await supabase
    .from("guests")
    .select("id, rsvp_code, full_name, group_id, group_label, is_attending");

  if (!guests) return notFound();

  const primary = guests.find(
    (guest) => generateDeterministicCode(guest.rsvp_code || "") === code
  );

  if (!primary) return notFound();

  const group = guests.filter(
    (g) => g.group_id === primary.group_id && g.id !== primary.id
  );

  return (
    <RsvpGuestForm
      primaryGuest={primary}
      groupLabel={primary.group_label}
      groupGuests={group}
    />
  );
}
