import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentHero extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Header;
  sys: { id: string };
  heroName: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCaption?: string;
  heroBody?: string;
  heroImage?: TypeComponentBasicMedia;
}
