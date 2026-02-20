import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentAccordionItem extends TypeComponentBase {
  __typename: typeof ComponentRegistry.AccordionItem;
  sys: { id: string };
  accordionItemTitle?: string;
  accordionItemBody?: string;
  accordionItemImage1?: TypeComponentBasicMedia;
}
