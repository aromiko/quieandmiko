import { TypeComponentMedia } from "@/lib/types";

export interface TypeComponentBasicMedia {
  basicMediaName?: string;
  basicMediaImage: TypeComponentMedia;
  basicMediaAltText: string;
  basicMediaWidth?: number;
  basicMediaHeight?: number;
  basicMediaFill?: boolean;
  basicMediaPriority?: boolean;
  basicMediaEager?: boolean;
  basicMediaLinkUrl?: string;
  basicMediaLinkIsExternal?: boolean;
}
