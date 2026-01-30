import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

import { TypeComponentText } from "../building-blocks/TypeComponentText";

export interface TypeComponentAttireCard extends TypeComponentBase {
  __typename: typeof ComponentRegistry.AttireCard;
  sys: { id: string };
  attireCardTitle?: string;
  attireCardMenTitle?: string;
  attireCardMenBody?: string;
  attireCardMenColorsTitle?: string;
  attireCardMenColorsCollection?: { items: TypeComponentText[] };
  attireCardWomenTitle?: string;
  attireCardWomenBody?: string;
  attireCardWomenColorsTitle?: string;
  attireCardWomenColorsCollection?: { items: TypeComponentText[] };
  attireCardBackground?: TypeComponentBasicMedia;
}
