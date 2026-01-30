import { ComponentRegistry } from "@/lib/configurations/component-registry";
import { TypeComponentBase, TypeComponentBasicMedia } from "@/lib/types";

export interface TypeComponentTimelineItem extends TypeComponentBase {
  __typename: typeof ComponentRegistry.TimelineItem;
  sys: { id: string };
  timelineItemTime?: string;
  timelineItemTitle?: string;
  timelineItemBody?: string;
  timelineItemBodyImage?: TypeComponentBasicMedia;
  timelineItemImage?: TypeComponentBasicMedia;
  timelineItemMapLink?: string;
}
