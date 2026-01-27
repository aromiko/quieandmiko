import {
  TypeComponentFooter,
  TypeComponentHeader,
  TypeComponentHero,
  TypeComponentMainHero,
  TypeComponentSimpleBlock
} from "@/lib/types";

export type TypePageContentItem =
  | TypeComponentHeader
  | TypeComponentFooter
  | TypeComponentHero
  | TypeComponentMainHero
  | TypeComponentSimpleBlock;
