import { ComponentRegistry } from "@/lib/configurations/component-registry";
import {
  TypeComponentAccordionItem,
  TypeComponentBase,
  TypeComponentBasicMedia
} from "@/lib/types";

export interface TypeComponentAccordionBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.AccordionBlock;
  sys: { id: string };
  accordionBlockTitle?: string;
  accordionBlockBody?: string;
  accordionBlockItemsCollection?: { items: TypeComponentAccordionItem[] };
  accordionBlockImage1?: TypeComponentBasicMedia;
}
