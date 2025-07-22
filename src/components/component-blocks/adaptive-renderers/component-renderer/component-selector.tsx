// src/components/component-blocks/adaptive-renderers/component-selector/component-selector.tsx
// Adjust the path as per your project structure

import {
  ComponentRegistry,
  ComponentTypenames
} from "@/lib/configurations/component-registry";
import React, { Suspense } from "react";

import { TypePageContentItem } from "@/lib/types";

interface ComponentSelectorProps {
  data: TypePageContentItem;
  typeName: ComponentTypenames;
}

// Note: We use 'any' for the lazy component type because each component expects different props.
// In a dynamic system, strict typing is not feasible unless all components share a common prop interface.
const componentMap: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  [ComponentRegistry.Header]: React.lazy(
    () => import("@/components/component-blocks/header/header")
  ),
  [ComponentRegistry.Footer]: React.lazy(
    () => import("@/components/component-blocks/footer/footer")
  ),
  [ComponentRegistry.Hero]: React.lazy(
    () => import("@/components/component-blocks/hero/hero")
  )
};

export default function ComponentSelector({
  data,
  typeName
}: ComponentSelectorProps) {
  const DynamicComponent = typeName ? componentMap[typeName] : undefined;

  if (!DynamicComponent) {
    console.warn(
      `[ComponentSelector] No component implemented for __typename: "${typeName}" (ID: ${data.sys.id})`
    );
    return <div>{`Component type "${typeName}" not found.`}</div>;
  }

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      {/* Spread data as props for maximum compatibility */}
      <DynamicComponent {...data} />
    </Suspense>
  );
}
