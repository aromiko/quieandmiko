import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentAttireCard, TypeComponentBase } from "@/lib/types";

export interface TypeComponentAttireBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.AttireBlock;
  sys: { id: string };
  attireBlockTitle?: string;
  attireBlockBody?: string;
  attireBlockCardsCollection?: { items: TypeComponentAttireCard[] };
}
