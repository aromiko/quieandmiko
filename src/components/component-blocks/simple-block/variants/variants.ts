import { TypeComponentSimpleBlock } from "@/lib/types";

import SimpleBlockGallery from "./simple-block-gallery";
import SimpleBlockImage from "./simple-block-image";
import SimpleBlockInvitation from "./simple-block-invitation";
import SimpleBlockRsvp from "./simple-block-rsvp";
import SimpleBlockStory from "./simple-block-story";

export const SimpleBlockVariants = {
  gallery: SimpleBlockGallery,
  image: SimpleBlockImage,
  invitation: SimpleBlockInvitation,
  rsvp: SimpleBlockRsvp,
  story: SimpleBlockStory
} satisfies Record<
  NonNullable<TypeComponentSimpleBlock["simpleBlockVariant"]>,
  React.ComponentType<TypeComponentSimpleBlock>
>;
