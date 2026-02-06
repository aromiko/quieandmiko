/**
 * Maps guest types to their corresponding image carousel titles in Contentful.
 * These titles must match exactly with the `imageCarouselTitle` field values in Contentful.
 */
export const GuestTypeCarouselMap = {
  guest: "Guests",
  primary_sponsor: "Principal Sponsors",
  entourage: "Entourage",
  best_man: "Best Man",
  maid_of_honor: "Maid of Honor",
  mother: "Mother",
  father: "Father"
} as const;

export type GuestType = keyof typeof GuestTypeCarouselMap;
export type CarouselTitle = (typeof GuestTypeCarouselMap)[GuestType];

/**
 * Gets the image carousel title for a given guest type
 */
export function getCarouselTitleForGuestType(
  guestType: GuestType
): CarouselTitle {
  return GuestTypeCarouselMap[guestType];
}
