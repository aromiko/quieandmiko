import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentRecommendationBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import RecommendationItem from "../recommendation-item/recommendation-item";

const RecommendationBlock = ({
  recommendationBlockTitle,
  recommendationBlockVariant,
  recommendationBlockItemsCollection
}: TypeComponentRecommendationBlock) => {
  return (
    <section className="px-8 py-16 lg:px-32">
      <div
        className={cn(
          "mx-auto flex flex-wrap gap-y-4 lg:max-w-5xl lg:gap-y-8",
          {
            "flex-row-reverse": recommendationBlockVariant === "right"
          }
        )}
      >
        <ScrollReveal
          variant="fade-up"
          className="flex w-full items-center justify-center sm:w-1/2 xl:w-1/3"
        >
          <h2 className="leading-15">{recommendationBlockTitle}</h2>
        </ScrollReveal>

        {recommendationBlockItemsCollection?.items &&
          recommendationBlockItemsCollection?.items.length > 0 &&
          recommendationBlockItemsCollection?.items.map(
            (recommendationItem, index) => (
              <RecommendationItem
                key={index}
                {...recommendationItem}
                recommendationItemClassName="w-full sm:w-1/2 xl:w-1/3"
                index={index}
              />
            )
          )}
      </div>
    </section>
  );
};

export default RecommendationBlock;
