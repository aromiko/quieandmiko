import { ComponentRegistry } from "@/lib/configurations/component-registry";
import {
  TypeComponentBase,
  TypeComponentBasicLink,
  TypeComponentBasicMedia
} from "@/lib/types";

export interface TypeComponentHeader extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Header;
  sys: { id: string };
  headerName: string;
  headerLogo?: TypeComponentBasicMedia;
  headerLinksCollection?: { items: TypeComponentBasicLink[] };
  headerVariant?: "solid" | "transparent";
  headerScrolled?: boolean;
}
