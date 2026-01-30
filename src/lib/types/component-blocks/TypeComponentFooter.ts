import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentFooter extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Footer;
  sys: { id: string };
  footerText?: string;
  footerBackground?: TypeComponentBasicMedia;
  footerLogo?: TypeComponentBasicMedia;
  footerVariant?: "center" | "left";
}
