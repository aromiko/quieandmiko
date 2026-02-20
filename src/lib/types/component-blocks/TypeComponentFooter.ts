import { ComponentRegistry } from "@/lib/configurations/component-registry";
import {
  TypeComponentBase,
  TypeComponentBasicLink,
  TypeComponentBasicMedia
} from "@/lib/types";

export interface TypeComponentFooter extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Footer;
  sys: { id: string };
  footerText?: string;
  footerBackground?: TypeComponentBasicMedia;
  footerBackgroundPosition?: string;
  footerLogo?: TypeComponentBasicMedia;
  footerVariant?: "center" | "left";
  footerLinksCollection?: { items: TypeComponentBasicLink[] };
}
