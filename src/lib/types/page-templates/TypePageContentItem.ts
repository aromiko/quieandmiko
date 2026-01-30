import {
  TypeComponentAttireBlock,
  TypeComponentFooter,
  TypeComponentHeader,
  TypeComponentHero,
  TypeComponentMainHero,
  TypeComponentSimpleBlock,
  TypeComponentTimelineBlock
} from "@/lib/types";

export type TypePageContentItem =
  | TypeComponentHeader
  | TypeComponentFooter
  | TypeComponentHero
  | TypeComponentMainHero
  | TypeComponentSimpleBlock
  | TypeComponentAttireBlock
  | TypeComponentTimelineBlock;
