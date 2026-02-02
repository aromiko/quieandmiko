import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase } from "@/lib/types";

export interface TypeComponentEntourageGroup extends TypeComponentBase {
  __typename: typeof ComponentRegistry.EntourageGroup;
  sys: { id: string };
  entourageGroupTitle?: string;
  entourageGroupNames?: string[];
  entourageGroupClassName?: string;
}
