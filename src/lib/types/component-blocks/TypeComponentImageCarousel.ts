import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentImageCarousel extends TypeComponentBase {
  __typename: typeof ComponentRegistry.ImageCarousel;
  sys: { id: string };
  imageCarouselTitle?: string;
  imageCarouselItemsCollection?: { items: TypeComponentBasicMedia[] };
  imageCarouselClassName?: string;
}
