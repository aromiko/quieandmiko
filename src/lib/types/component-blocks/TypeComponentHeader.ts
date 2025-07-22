import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

import { ComponentRegistry } from "@/lib/configurations/component-registry";

export interface TypeComponentHeader extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Header;
  sys: { id: string };
  headerName: string;
  headerLogo?: TypeComponentBasicMedia;
}
