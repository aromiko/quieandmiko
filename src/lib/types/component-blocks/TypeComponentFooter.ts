import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase } from "@/lib/types";

export interface TypeComponentFooter extends TypeComponentBase {
  __typename: typeof ComponentRegistry.Footer;
  sys: { id: string };
  footerName: string;
}
