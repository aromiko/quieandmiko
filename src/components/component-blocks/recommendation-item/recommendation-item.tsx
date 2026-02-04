import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentRecommendationItem } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

const RecommendationItem = ({
  recommendationItemTitle,
  recommendationItemNumber,
  recommendationItemImage,
  recommendationItemBody1,
  recommendationItemBody2,
  recommendationItemBackgroundImage,
  recommendationItemClassName
}: TypeComponentRecommendationItem) => {
  return (
    <div
      className={cn("flex flex-col items-center", recommendationItemClassName)}
    >
      <div
        className={cn(
          "flex aspect-[0.86/1] w-[311px] flex-col items-center bg-contain p-8"
        )}
        style={{
          backgroundImage: `url(${recommendationItemBackgroundImage?.basicMediaImage.url})`
        }}
      >
        {recommendationItemImage && (
          <BasicMedia
            data={recommendationItemImage}
            wrapperCssClass="w-[248px] aspect-[1/1]"
            imageCssClass="object-cover"
            sizes="248px"
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
      <span className="font-mono text-sm">{recommendationItemBody1}</span>
      <span className="font-mono text-sm">{recommendationItemBody2}</span>
    </div>
  );
};

export default RecommendationItem;
