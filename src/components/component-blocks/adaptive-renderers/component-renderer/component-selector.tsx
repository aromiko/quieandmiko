// src/components/component-blocks/adaptive-renderers/component-selector/component-selector.tsx
// Adjust the path as per your project structure

import {
  ComponentRegistry,
  ComponentTypenames
} from "@/lib/configurations/component-registry";
import {
  TypeComponentFooter,
  TypeComponentHeader,
  TypeComponentHero,
  TypePageContentItem
} from "@/lib/types";

import Footer from "@/components/component-blocks/footer/footer";
import Header from "@/components/component-blocks/header/header";
import Hero from "@/components/component-blocks/hero/hero";
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
