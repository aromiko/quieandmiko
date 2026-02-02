import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase } from "@/lib/types";

import { TypeComponentRecommendationItem } from "./TypeComponentRecommendationItem";

export interface TypeComponentRecommendationBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.RecommendationBlock;
  sys: { id: string };
  recommendationBlockTitle?: string;
  recommendationBlockItemsCollection?: {
    items: TypeComponentRecommendationItem[];
  };
  recommendationBlockVariant?: "left" | "right" | "center";
}
