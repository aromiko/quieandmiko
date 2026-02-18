import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentImageCarouselBlock } from "@/lib/types";

import ImageCarousel from "../image-carousel/image-carousel";

const ImageCarouselBlock = ({
  imageCarouselBlockTitle,
  imageCarouselBlockSlidersCollection
}: TypeComponentImageCarouselBlock) => {
  return (
    <section className="flex flex-col items-center justify-center gap-20 px-8 py-16 lg:px-32">
      {imageCarouselBlockTitle && (
        <ScrollReveal variant="fade-up">
          <h2 className="text-coffee max-w-xl text-center font-serif text-4xl">
            {imageCarouselBlockTitle}
          </h2>
        </ScrollReveal>
      )}
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-6 lg:flex-row">
        {imageCarouselBlockSlidersCollection?.items &&
          imageCarouselBlockSlidersCollection.items.length > 0 &&
          imageCarouselBlockSlidersCollection.items.map((carousel, index) => (
            <ScrollReveal
              key={carousel.sys.id}
              variant="fade-up"
              delay={index * 0.15}
            >
              <ImageCarousel
                {...carousel}
                imageCarouselClassName="w-[311px] md:w-[410px]"
              />
            </ScrollReveal>
          ))}
      </div>
    </section>
  );
};

export default ImageCarouselBlock;
