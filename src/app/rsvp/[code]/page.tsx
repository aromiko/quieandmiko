import ImageCarousel from "@/components/component-blocks/image-carousel/image-carousel";
import RsvpGuestForm from "@/components/component-blocks/rsvp/rsvp-guest-form";
import Page from "@/components/page-templates/page/page";
import {
  GuestType,
  getCarouselTitleForGuestType
} from "@/lib/configurations/guest-type-carousel-map";
import { InjectionRegistry } from "@/lib/configurations/injection-registry";
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
import { generateDeterministicCode } from "@/lib/utils/crypto";
import { ContentsFacade } from "@/queries/content-facade";
import { AlertCircle, Camera } from "lucide-react";
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
      "id, rsvp_code, full_name, group_id, group_label, is_attending, is_adult, guest_type, email, contact_number, food_allergies, has_hotel_booking"
    )
    .order("id", { ascending: true });

  if (!guests) return notFound();

  const primary = guests.find(
    (guest) => generateDeterministicCode(guest.rsvp_code || "") === code
  );

  if (!primary) return notFound();

  const group = guests.filter(
    (g) => g.group_id === primary.group_id && g.id !== primary.id
  );

  // Fetch attire carousel based on guest type
  const carouselTitle = getCarouselTitleForGuestType(
    primary.guest_type as GuestType
  );
  const attireCarousel =
    await ContentsFacade.getImageCarouselByTitle(carouselTitle);

  return (
    <Page
      slug="rsvp-form"
      injections={{
        [InjectionRegistry.RsvpGuestForm]: (
          <RsvpGuestForm
            primaryGuest={primary}
            groupLabel={primary.group_label}
            groupGuests={group}
          />
        ),
        [InjectionRegistry.RsvpAttireCarousel]: attireCarousel && (
          <section className="flex flex-col items-center justify-center px-8 py-16">
            <h2 className="text-coffee mb-4 text-center font-serif text-2xl lg:text-3xl">
              Your Dress Code
            </h2>
            <p className="text-coffee mb-8 max-w-md text-center font-mono text-sm font-light">
              Based on your guest type, here&apos;s your recommended attire
            </p>
            <div className="w-[311px] md:w-[410px]">
              <ImageCarousel
                {...attireCarousel}
                imageCarouselHideTitle={true}
              />
            </div>

            {/* Important Reminders */}
            <div className="mt-12 flex w-full max-w-2xl flex-col gap-6">
              {/* Adults Only */}
              <div className="border-coffee/20 bg-cream/50 rounded-lg border p-6 text-center">
                <div className="bg-wine/15 text-wine mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <AlertCircle className="size-6" />
                </div>
                <h3 className="text-coffee mb-3 font-serif text-xl">
                  Adults-Only Celebration
                </h3>
                <p className="text-coffee/80 font-mono text-sm leading-relaxed">
                  While we love your little ones, we kindly ask that our wedding
                  be an adults-only celebration.
                </p>
              </div>

              {/* Unplugged Ceremony */}
              <div className="border-coffee/20 bg-cream/50 rounded-lg border p-6 text-center">
                <div className="bg-wine/15 text-wine mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <Camera className="size-6" />
                </div>
                <h3 className="text-coffee mb-3 font-serif text-xl">
                  Unplugged Ceremony
                </h3>
                <p className="text-coffee/80 font-mono text-sm leading-relaxed">
                  We invite you to be fully present with us during our unplugged
                  ceremony. Kindly refrain from using phones and cameras as our
                  professional photo and video team will capture the moments for
                  us.
                </p>
                <p className="text-coffee/60 mt-3 font-mono text-xs">
                  You are welcome to take photos and videos during the
                  reception.
                </p>
              </div>
            </div>
          </section>
        )
      }}
    />
  );
}
