import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentRecommendationItem } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import { ExternalLink } from "lucide-react";

type RecommendationItemProps = TypeComponentRecommendationItem & {
  index?: number;
};

const RecommendationItem = ({
  recommendationItemTitle,
  recommendationItemNumber,
  recommendationItemImage,
  recommendationItemBody1,
  recommendationItemBody2,
  recommendationItemBackgroundImage,
  recommendationItemClassName,
  recommendationItemLink,
  index = 0
}: RecommendationItemProps) => {
  const cardContent = (
    <div
      className={cn(
        "flex aspect-[0.86/1] w-[311px] flex-col items-center bg-contain p-8",
        recommendationItemLink && "relative"
      )}
      style={{
        backgroundImage: `url(${recommendationItemBackgroundImage?.basicMediaImage.url})`
      }}
    >
      {recommendationItemLink && (
        <div className="bg-wine/90 absolute right-6 top-6 z-10 rounded-full p-1.5 shadow-sm">
          <ExternalLink className="text-cream size-4" strokeWidth={2} />
        </div>
      )}
      {recommendationItemImage && (
        <BasicMedia
          data={recommendationItemImage}
          wrapperCssClass="w-[248px] aspect-[1/1]"
          imageCssClass="object-cover"
          sizes="500px"
        />
      )}
      <div className="mt-2 flex flex-row items-baseline gap-2">
        <div className="border-coffee text-coffee flex size-5 min-w-5 items-center justify-center rounded-full border font-mono text-xs leading-5">
          {recommendationItemNumber}
        </div>
        <h3 className="text-coffee font-serif text-lg leading-5">
          {recommendationItemTitle}
        </h3>
      </div>
    </div>
  );

  return (
    <ScrollReveal
      variant="scale-up"
      delay={index * 0.12}
      className={cn("flex flex-col items-center", recommendationItemClassName)}
    >
      {recommendationItemLink ? (
        <a
          href={recommendationItemLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-100"
          aria-label={`${recommendationItemTitle} (opens in new tab)`}
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
      <span className="font-mono text-sm">{recommendationItemBody1}</span>
      <span className="font-mono text-sm">{recommendationItemBody2}</span>
    </ScrollReveal>
  );
};

export default RecommendationItem;
