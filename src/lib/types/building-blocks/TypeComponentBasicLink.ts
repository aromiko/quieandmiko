import { TypeComponentBase } from "./TypeComponentBase";

export interface TypeComponentBasicLink extends TypeComponentBase {
  basicLinkName: string;
  linkText?: string;
  linkUrl?: string;
  linkIsExternal: boolean;
  linkIsButton: boolean;
}
