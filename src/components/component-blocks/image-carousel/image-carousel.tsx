import { TypeComponentImageCarousel } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import ImageSlides from "./image-slides";

const ImageCarousel = ({
  imageCarouselTitle,
  imageCarouselItemsCollection,
  imageCarouselClassName
}: TypeComponentImageCarousel) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        imageCarouselClassName
      )}
    >
      <div>
        <h2 className="text-coffee max-w-2xl text-center font-serif text-4xl">
          {imageCarouselTitle}
        </h2>
      </div>
      <div className="max-w-120 w-full p-4">
        {imageCarouselItemsCollection?.items &&
          imageCarouselItemsCollection.items.length > 0 && (
            <ImageSlides
              slides={imageCarouselItemsCollection.items.map((item) => {
                return {
                  src: item.basicMediaImage.url,
                  alt: item.basicMediaAltText
                };
              })}
            />
          )}
      </div>
    </div>
  );
};

export default ImageCarousel;
