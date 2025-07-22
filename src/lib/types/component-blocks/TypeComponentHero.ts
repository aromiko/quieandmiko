import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

import { ComponentRegistry } from "@/lib/configurations/component-registry";

export interface TypeComponentHero extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Header;
  sys: { id: string };
  heroName: string;
  heroTitle?: string;
  heroBody?: string;
  heroImage?: TypeComponentBasicMedia;
}
