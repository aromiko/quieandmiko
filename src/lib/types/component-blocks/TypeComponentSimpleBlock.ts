import { ComponentRegistry } from "@/lib/configurations/component-registry";
import {
  TypeComponentBase,
  TypeComponentBasicLink,
  TypeComponentBasicMedia
} from "@/lib/types";

export interface TypeComponentSimpleBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.SimpleBlock;
  sys: { id: string };
  simpleBlockName: string;
  simpleBlockTitle?: string;
  simpleBlockSubtitle?: string;
  simpleBlockBody1?: string;
  simpleBlockBody2?: string;
  simpleBlockCta?: TypeComponentBasicLink;
  simpleBlockVariant?:
    | "banner"
    | "banner-rsvp"
    | "gallery"
    | "gift"
    | "image"
    | "invitation"
    | "rsvp"
    | "story";
  simpleBlockImage1?: TypeComponentBasicMedia;
  simpleBlockImage1Position?: "center" | "top" | "bottom" | "10% center";
  simpleBlockImage2?: TypeComponentBasicMedia;
  simpleBlockImage3?: TypeComponentBasicMedia;
  simpleBlockImage4?: TypeComponentBasicMedia;
  simpleBlockImage5?: TypeComponentBasicMedia;
  simpleBlockClassName?: string;
  simpleBlockMoreInfo?: string;
  simpleBlockMoreInfoLink?: TypeComponentBasicLink;
}
