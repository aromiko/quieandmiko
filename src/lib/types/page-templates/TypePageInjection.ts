import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase } from "@/lib/types";

export interface TypeComponentPageInjection extends TypeComponentBase {
  __typename: typeof ComponentRegistry.PageInjection;
  sys: { id: string };
  pageInjectionTargetName?: string;
}
