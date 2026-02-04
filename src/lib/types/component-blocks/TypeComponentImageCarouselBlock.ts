import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentImageCarousel } from "@/lib/types";

export interface TypeComponentImageCarouselBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.ImageCarousel;
  sys: { id: string };
  imageCarouselBlockTitle?: string;
  imageCarouselBlockSlidersCollection?: { items: TypeComponentImageCarousel[] };
}
