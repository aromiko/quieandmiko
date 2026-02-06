import { TypeComponentImageCarousel } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import ImageSlides from "./image-slides";

const ImageCarousel = ({
  imageCarouselTitle,
  imageCarouselCover,
  imageCarouselItemsCollection,
  imageCarouselClassName,
  imageCarouselHideTitle
}: TypeComponentImageCarousel) => {
  const items = imageCarouselItemsCollection?.items || [];
  const hasContent = imageCarouselCover || items.length > 0;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4",
        imageCarouselClassName
      )}
    >
      {!imageCarouselHideTitle && imageCarouselTitle && (
        <div>
          <h4 className="text-coffee max-w-2xl text-center font-serif text-3xl">
            {imageCarouselTitle}
          </h4>
        </div>
      )}
      <div className="w-full">
        {hasContent && <ImageSlides cover={imageCarouselCover} items={items} />}
      </div>
    </div>
  );
};

export default ImageCarousel;
