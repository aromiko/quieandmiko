import { TypeComponentSimpleBlock } from "@/lib/types";

import SimpleBlockBanner from "./simple-block-banner";
import SimpleBlockBannerRsvp from "./simple-block-banner-rsvp";
import SimpleBlockGallery from "./simple-block-gallery";
import SimpleBlockImage from "./simple-block-image";
import SimpleBlockInvitation from "./simple-block-invitation";
import SimpleBlockRsvp from "./simple-block-rsvp";
import SimpleBlockStory from "./simple-block-story";

export const SimpleBlockVariants = {
  banner: SimpleBlockBanner,
  "banner-rsvp": SimpleBlockBannerRsvp,
  gallery: SimpleBlockGallery,
  image: SimpleBlockImage,
  invitation: SimpleBlockInvitation,
  rsvp: SimpleBlockRsvp,
  story: SimpleBlockStory
} satisfies Record<
  NonNullable<TypeComponentSimpleBlock["simpleBlockVariant"]>,
  React.ComponentType<TypeComponentSimpleBlock>
>;
