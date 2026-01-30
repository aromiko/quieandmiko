import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase } from "@/lib/types";

import { TypeComponentTimelineItem } from "./TypeComponentTimelineItem";

export interface TypeComponentTimelineBlock extends TypeComponentBase {
  __typename: typeof ComponentRegistry.TimelineBlock;
  sys: { id: string };
  timelineBlockItemsCollection?: { items: TypeComponentTimelineItem[] };
}
