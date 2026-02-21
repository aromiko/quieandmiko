import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentSimpleBlock } from "@/lib/types";

import ParallaxBackground from "../../animation-wrapper/parallax-background";

const SimpleBlockBanner = ({
  simpleBlockTitle,
  simpleBlockImage1
}: TypeComponentSimpleBlock) => {
  return (
    <ParallaxBackground
      imageUrl={simpleBlockImage1?.basicMediaImage.url}
      speed={0.25}
      overlay="bg-black/20"
      className="h-144 bg-cover bg-center"
    >
      <div className="h-144 absolute inset-0 bg-black/35" />
      <ScrollReveal
        variant="fade-up"
        duration={1}
        className="flex h-full w-full items-center justify-center text-center"
      >
        <h2 className="relative z-20 w-full text-7xl text-white lg:text-8xl">
          {simpleBlockTitle}
        </h2>
      </ScrollReveal>
      {/* </section> */}
    </ParallaxBackground>
  );
};

export default SimpleBlockBanner;
