// src/components/component-blocks/adaptive-renderers/component-selector/component-selector.tsx
// Adjust the path as per your project structure
import AttireBlock from "@/components/component-blocks/attire-block/attire-block";
import EntourageBlock from "@/components/component-blocks/entourage-block/entourage-block";
import Footer from "@/components/component-blocks/footer/footer";
import Header from "@/components/component-blocks/header/header";
import Hero from "@/components/component-blocks/hero/hero";
import MainHero from "@/components/component-blocks/hero/main-hero";
import ImageCarouselBlock from "@/components/component-blocks/image-carousel-block/image-carousel-block";
import RecommendationBlock from "@/components/component-blocks/recommendation-block/recommendation-block";
import SimpleBlock from "@/components/component-blocks/simple-block/simple-block";
import TimelineBlock from "@/components/component-blocks/timeline-block/timeline-block";
import {
  ComponentRegistry,
  ComponentTypenames
} from "@/lib/configurations/component-registry";
import {
  TypeComponentAttireBlock,
  TypeComponentEntourageBlock,
  TypeComponentFooter,
  TypeComponentHeader,
  TypeComponentHero,
  TypeComponentImageCarouselBlock,
  TypeComponentMainHero,
  TypeComponentRecommendationBlock,
  TypeComponentSimpleBlock,
  TypeComponentTimelineBlock,
  TypePageContentItem
} from "@/lib/types";
import { JSX } from "react";

interface ComponentSelectorProps {
  data: TypePageContentItem;
  typeName: ComponentTypenames;
}

export default function ComponentSelector({
  data,
  typeName
}: ComponentSelectorProps): JSX.Element | null {
  switch (typeName) {
    case ComponentRegistry.Header:
      // We cast 'content' to its specific type, which is safe due to the 'typeName' check.
      return <Header {...(data as TypeComponentHeader)} />;
    case ComponentRegistry.Footer:
      return <Footer {...(data as TypeComponentFooter)} />;
    case ComponentRegistry.Hero:
      return <Hero {...(data as TypeComponentHero)} />;
    case ComponentRegistry.MainHero:
      return <MainHero {...(data as TypeComponentMainHero)} />;
    case ComponentRegistry.SimpleBlock:
      return <SimpleBlock {...(data as TypeComponentSimpleBlock)} />;
    case ComponentRegistry.AttireBlock:
      return <AttireBlock {...(data as TypeComponentAttireBlock)} />;
    case ComponentRegistry.TimelineBlock:
      return <TimelineBlock {...(data as TypeComponentTimelineBlock)} />;
    case ComponentRegistry.EntourageBlock:
      return <EntourageBlock {...(data as TypeComponentEntourageBlock)} />;
    case ComponentRegistry.RecommendationBlock:
      return (
        <RecommendationBlock {...(data as TypeComponentRecommendationBlock)} />
      );
    case ComponentRegistry.ImageCarouselBlock:
      return (
        <ImageCarouselBlock {...(data as TypeComponentImageCarouselBlock)} />
      );
    default:
      // Fallback for __typename values that are valid strings but have no matching component.
      // The initial console.warn can be here or in the ComponentRenderer.
      // For consistency, if ComponentRenderer already warns, this could just be the fallback UI.
      console.warn(
        `[ComponentSelector] No component implemented for __typename: "${typeName}" (ID: ${data.sys.id})`
      );
      return <div>{`Component type "${typeName}" not found.`}</div>;
  }
}
