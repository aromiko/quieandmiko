// section-renderer.tsx: (Mostly unchanged, but consider if dataProps/otherProps are needed currently)
import ComponentRenderer from "@/components/component-blocks/adaptive-renderers/component-renderer/component-renderer";
import { PageInjections } from "@/lib/configurations/injection-registry";
import { TypePageContentItem } from "@/lib/types";
// Ensure this type aligns with the data structure
import React from "react";

interface SectionRendererProps {
  components: TypePageContentItem[]; // These items would now contain full data
  injections?: PageInjections;
  sectionAs?: React.ElementType; // Renamed for clarity from 'section' to avoid conflict
  className?: string; // Example of a common prop you might want
  // dataProps?: Record<string, any>; // Keep if you have specific use-cases
  // otherProps?: Record<string, unknown>; // Keep if you have specific use-cases
}

export default function SectionRenderer({
  components,
  injections,
  sectionAs,
  className
  // dataProps = {},
  // otherProps = {}
}: SectionRendererProps) {
  // ... (try-catch block)
  if (!components?.length) return null;
  const SemanticTag = sectionAs || "div";

  return (
    <SemanticTag /* {...dataProps} {...otherProps} */ className={className}>
      {components.map((content) => (
        // Ensure content includes a unique key, sys.id is good
        <ComponentRenderer
          key={content.sys.id}
          data={content}
          injections={injections}
        />
      ))}
    </SemanticTag>
  );
  // ... (error handling)
}
