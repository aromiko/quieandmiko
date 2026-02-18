import { TypeComponentTimelineBlock } from "@/lib/types";

import TimelineItem from "../timeline-item/timeline-item";

const TimelineBlock = ({
  timelineBlockItemsCollection,
  timelineBlockBackgroundImage
}: TypeComponentTimelineBlock) => {
  return (
    <section
      className="bg-wine lg:min-w-5xl mx-8 my-16 flex max-w-7xl flex-col items-center justify-center place-self-center bg-contain px-8 py-14 lg:px-14"
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
