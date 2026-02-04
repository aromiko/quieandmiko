import { TypeComponentImageCarouselBlock } from "@/lib/types";

import ImageCarousel from "../image-carousel/image-carousel";

const ImageCarouselBlock = ({
  imageCarouselBlockTitle,
  imageCarouselBlockSlidersCollection
}: TypeComponentImageCarouselBlock) => {
  return (
    <section className="flex flex-col items-center justify-center gap-20 px-8 py-16 lg:px-32">
      {imageCarouselBlockTitle && (
        <h2 className="text-coffee max-w-xl text-center font-serif text-4xl">
          {imageCarouselBlockTitle}
        </h2>
      )}
      <div className="flex w-full flex-wrap justify-center gap-20 md:gap-0">
        {imageCarouselBlockSlidersCollection?.items &&
          imageCarouselBlockSlidersCollection.items.length > 0 &&
          imageCarouselBlockSlidersCollection.items.map((carousel) => (
            <ImageCarousel
              key={carousel.sys.id}
              {...carousel}
              imageCarouselClassName="w-full md:w-1/2"
            />
          ))}
      </div>
    </section>
  );
};

export default ImageCarouselBlock;
