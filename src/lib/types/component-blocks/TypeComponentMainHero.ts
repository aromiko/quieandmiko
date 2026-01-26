import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentMainHero extends TypeComponentBase {
  __typename: typeof ComponentRegistry.MainHero;
  sys: { id: string };
  mainHeroName: string;
  mainHeroTitle?: string;
  mainHeroInitials1?: string;
  mainHeroInitials2?: string;
  mainHeroMonogram?: TypeComponentBasicMedia;
  mainHeroDateBadge?: TypeComponentBasicMedia;
  mainHeroImagesCollection?: { items: TypeComponentBasicMedia[] };
}
