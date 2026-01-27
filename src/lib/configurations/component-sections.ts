import { ComponentRegistry } from "@/lib/configurations/component-registry";

export const ComponentSections = {
  Header: [ComponentRegistry.Header],
  Main: [
    ComponentRegistry.Hero,
    ComponentRegistry.MainHero,
    ComponentRegistry.SimpleBlock
  ],
  Footer: [ComponentRegistry.Footer]
};
