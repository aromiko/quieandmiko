import { TypeComponentTimelineBlock } from "@/lib/types";

import TimelineItem from "../timeline-item/timeline-item";

const TimelineBlock = ({
  timelineBlockItemsCollection
}: TypeComponentTimelineBlock) => {
  return (
    <section className="bg-wine mx-8 my-16 flex flex-col items-center justify-center px-8 py-14 lg:mx-32 lg:px-20">
      {timelineBlockItemsCollection?.items &&
        timelineBlockItemsCollection?.items.length &&
        timelineBlockItemsCollection.items.map((timelineItem, index) => (
          <TimelineItem key={index} {...timelineItem} />
        ))}
    </section>
  );
};

export default TimelineBlock;
