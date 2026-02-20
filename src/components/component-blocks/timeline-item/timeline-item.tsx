import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import TimelineMapEmbed from "@/components/component-blocks/timeline-item/timeline-map-embed";
import { TypeComponentTimelineItem } from "@/lib/types";

type TimelineItemProps = TypeComponentTimelineItem & {
  index?: number;
};

const TimelineItem = ({
  timelineItemTime,
  timelineItemTitle,
  timelineItemBody,
  timelineItemBodyImage,
  timelineItemMapLink,
  timelineItemImage,
  index = 0
}: TimelineItemProps) => {
  return (
    <ScrollReveal
      variant="fade-up"
      delay={index * 0.15}
      amount={0}
      as="article"
      className="not-first:border-t-1 border-cream w-full"
    >
      <div className="flex flex-col gap-0 px-0 py-14 text-white lg:flex-row lg:gap-20">
        <time className="mb-4 block font-mono text-2xl lg:hidden">
          {timelineItemTime}
        </time>
        <div className="flex w-full flex-row items-center lg:w-1/3 lg:flex-col">
          <div className="flex grow flex-col">
            <time className="hidden font-mono text-2xl lg:block">
              {timelineItemTime}
            </time>
            {timelineItemTitle && (
              <h2 className="block font-serif text-3xl text-white lg:hidden">
                {timelineItemTitle}
              </h2>
            )}
          </div>

          {timelineItemImage && (
            <ScrollReveal variant="scale" delay={0.2}>
              <BasicMedia
                data={timelineItemImage}
                wrapperCssClass="w-40 md:w-50 w-[100px] lg:w-[150px] lg:h-[150px] aspect-[1/1] lg:mb-22"
                sizes="(min-width: 1024px) 150px, 100px"
              />
            </ScrollReveal>
          )}
        </div>

        <div className="flex w-full flex-col lg:w-2/3">
          {timelineItemTitle && (
            <ScrollReveal variant="fade-left" delay={0.1}>
              <h2 className="hidden font-serif text-3xl text-white lg:block">
                {timelineItemTitle}
              </h2>
            </ScrollReveal>
          )}

          {timelineItemBody && (
            <ScrollReveal variant="fade" delay={0.2}>
              <p className="text-lg font-light lg:mt-4">{timelineItemBody}</p>
            </ScrollReveal>
          )}

          {timelineItemMapLink && (
            <TimelineMapEmbed src={timelineItemMapLink} />
          )}

          {timelineItemBodyImage && (
            <ScrollReveal variant="fade-up" delay={0.3}>
              <BasicMedia
                data={timelineItemBodyImage}
                wrapperCssClass="mt-8 w-full h-120 lg:h-96 overflow-hidden"
                imageCssClass="object-cover object-top"
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </ScrollReveal>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default TimelineItem;
