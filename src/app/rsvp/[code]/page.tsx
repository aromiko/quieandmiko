import RsvpClientForm from "@/components/component-blocks/rsvp/rsvp-form-client";
// keep UI interactive
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
// use a server-side client
import { notFound } from "next/navigation";

export default async function RsvpPage({
  params
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: primary, error: matchError } = await supabase
    .from("guests")
    .select("id, full_name, group_id, group_label, is_attending")
    .eq("rsvp_code", code)
    .maybeSingle();

  if (matchError || !primary) return notFound();

  const { data: group } = await supabase
    .from("guests")
    .select("id, full_name, is_attending")
    .eq("group_id", primary.group_id);

  const guests = group?.filter((g) => g.id !== primary.id) || [];

  return (
    <RsvpClientForm
      primaryGuest={primary}
      groupLabel={primary.group_label}
      groupGuests={guests}
    />
  );
}
