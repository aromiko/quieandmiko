import RsvpGuestForm from "@/components/component-blocks/rsvp/rsvp-guest-form";
import Page from "@/components/page-templates/page/page";
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
import { generateDeterministicCode } from "@/lib/utils/crypto";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "RSVP | Quie & Miko",
    description:
      "Let Quie and Miko know you’re joining their special day. RSVP here to confirm your attendance and receive important wedding updates.",
    robots: "noindex, nofollow"
  };
}

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
    .select(
      "id, rsvp_code, full_name, group_id, group_label, is_attending, is_adult, guest_type, email, contact_number"
    );

  if (!guests) return notFound();

  const primary = guests.find(
    (guest) => generateDeterministicCode(guest.rsvp_code || "") === code
  );

  if (!primary) return notFound();

  const group = guests.filter(
    (g) => g.group_id === primary.group_id && g.id !== primary.id
  );

  return (
    <Page
      slug="rsvp-form"
      injectedComponent={
        <RsvpGuestForm
          primaryGuest={primary}
          groupLabel={primary.group_label}
          groupGuests={group}
        />
      }
    />
  );
}
