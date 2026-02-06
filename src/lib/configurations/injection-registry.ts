/**
 * Registry of all available page injection points.
 * Maps injection target names to their metadata.
 *
 * These names must match the `pageInjectionTargetName` values
 * set in Contentful's ComponentPageInjection content type.
 */
export const InjectionRegistry = {
  RsvpCodeForm: "rsvp-code-form",
  RsvpGuestForm: "rsvp-form",
  RsvpAttireCarousel: "rsvp-attire-carousel"
} as const;

/**
 * Union type of all valid injection target names.
 * Use this for type-safe injection keys.
 */
export type InjectionTargetName =
  (typeof InjectionRegistry)[keyof typeof InjectionRegistry];

/**
 * Type for the injections prop used in Page components.
 * Maps injection target names to React nodes.
 */
export type PageInjections = Partial<
  Record<InjectionTargetName, React.ReactNode>
>;
