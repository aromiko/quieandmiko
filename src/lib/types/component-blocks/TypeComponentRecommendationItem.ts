import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentRecommendationItem extends TypeComponentBase {
  __typename: typeof ComponentRegistry.RecommendationItem;
  sys: { id: string };
  recommendationItemTitle?: string;
  recommendationItemNumber?: string;
  recommendationItemBody?: string;
  recommendationItemImage?: TypeComponentBasicMedia;
}
