import {
  TypeComponentAttireBlock,
  TypeComponentEntourageBlock,
  TypeComponentEntourageGroup,
  TypeComponentFooter,
  TypeComponentHeader,
  TypeComponentHero,
  TypeComponentImageCarousel,
  TypeComponentImageCarouselBlock,
  TypeComponentMainHero,
  TypeComponentPageInjection,
  TypeComponentRecommendationBlock,
  TypeComponentRecommendationItem,
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
  | TypeComponentTimelineBlock
  | TypeComponentEntourageBlock
  | TypeComponentEntourageGroup
  | TypeComponentRecommendationBlock
  | TypeComponentRecommendationItem
  | TypeComponentImageCarousel
  | TypeComponentImageCarouselBlock
  | TypeComponentPageInjection;
