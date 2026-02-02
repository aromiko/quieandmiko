import { ComponentRegistry } from "@/lib/configurations/component-registry";

export const ComponentSections = {
  Header: [ComponentRegistry.Header],
  Main: [
    ComponentRegistry.Hero,
    ComponentRegistry.MainHero,
    ComponentRegistry.SimpleBlock,
    ComponentRegistry.AttireBlock,
    ComponentRegistry.TimelineBlock,
    ComponentRegistry.EntourageBlock,
    ComponentRegistry.RecommendationBlock,
    ComponentRegistry.ImageCarousel
  ],
  Footer: [ComponentRegistry.Footer]
};
