import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

import { TypeComponentEntourageGroup } from "./TypeComponentEntourageGroup";

export interface TypeComponentEntourageBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.EntourageBlock;
  sys: { id: string };
  entourageBlockTitle?: string;
  entourageBlockImage?: TypeComponentBasicMedia;
  entourageBlockGroupsCollection?: { items: TypeComponentEntourageGroup[] };
  entourageBlockBackgroundImage?: TypeComponentBasicMedia;
}
