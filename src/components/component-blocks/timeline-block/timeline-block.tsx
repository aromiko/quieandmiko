import { TypeComponentTimelineBlock } from "@/lib/types";

import TimelineItem from "../timeline-item/timeline-item";

const TimelineBlock = ({
  timelineBlockItemsCollection,
  timelineBlockBackgroundImage
}: TypeComponentTimelineBlock) => {
  return (
    <section
      className="bg-wine mx-8 my-16 flex flex-col items-center justify-center bg-contain px-8 py-14 lg:mx-32 lg:px-20"
      style={{
        backgroundImage: `url(${timelineBlockBackgroundImage?.basicMediaImage.url})`
      }}
    >
      {timelineBlockItemsCollection?.items &&
        timelineBlockItemsCollection?.items.length &&
        timelineBlockItemsCollection.items.map((timelineItem, index) => (
          <TimelineItem key={index} {...timelineItem} />
        ))}
    </section>
  );
};

export default TimelineBlock;
