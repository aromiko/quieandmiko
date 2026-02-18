import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import TimelineMapEmbed from "@/components/component-blocks/timeline-item/timeline-map-embed";
import { TypeComponentTimelineItem } from "@/lib/types";

const TimelineItem = ({
  timelineItemTime,
  timelineItemTitle,
  timelineItemBody,
  timelineItemBodyImage,
  timelineItemMapLink,
  timelineItemImage
}: TypeComponentTimelineItem) => {
  return (
    <article className="not-first:border-t-1 border-cream flex w-full flex-col gap-0 px-0 py-14 text-white lg:flex-row lg:gap-20">
      <div className="lex-row flex w-full items-center lg:w-1/3 lg:flex-col">
        <div className="flex grow flex-col">
          <time className="font-mono text-2xl">{timelineItemTime}</time>
          {timelineItemTitle && (
            <h2 className="block font-serif text-3xl text-white lg:hidden">
              {timelineItemTitle}
            </h2>
          )}
        </div>

        {timelineItemImage && (
          <BasicMedia
            data={timelineItemImage}
            wrapperCssClass="w-40 md:w-50 w-[100px] lg:w-[150px] lg:h-[150px] aspect-[1/1] lg:mb-22"
            sizes="(min-width: 1024px) 150px, 100px"
          />
        )}
      </div>

      <div className="flex w-full flex-col lg:w-2/3">
        {timelineItemTitle && (
          <h2 className="hidden font-serif text-3xl text-white lg:block">
            {timelineItemTitle}
          </h2>
        )}

        {timelineItemBody && (
          <p className="text-lg font-light lg:mt-4">{timelineItemBody}</p>
        )}

        {timelineItemMapLink && <TimelineMapEmbed src={timelineItemMapLink} />}

        {timelineItemBodyImage && (
          <BasicMedia
            data={timelineItemBodyImage}
            wrapperCssClass="mt-8 w-full h-120 lg:h-96 overflow-hidden"
            imageCssClass="object-cover object-top"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        )}
      </div>
    </article>
  );
};

export default TimelineItem;
