import ParallaxBackground from "@/components/component-blocks/animation-wrapper/parallax-background";
import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockBannerRsvp = ({
  simpleBlockTitle,
  simpleBlockImage1
}: TypeComponentSimpleBlock) => {
  return (
    <ParallaxBackground
      imageUrl={simpleBlockImage1?.basicMediaImage.url}
      speed={0.25}
      overlay="bg-black/20"
      className="h-144 flex items-center justify-center"
      imagePosition="center 20%"
    >
      {/* Decorative RSVP letters in corners */}
      <span className="font-script lg:h-30 absolute left-4 top-24 z-20 w-20 text-7xl font-bold text-white/50 lg:left-10 lg:top-24 lg:w-36 lg:text-9xl">
        R
      </span>
      <span className="font-script lg:h-30 absolute right-4 top-24 z-20 w-20 text-7xl font-bold text-white/50 lg:right-10 lg:top-24 lg:w-36 lg:text-9xl">
        S
      </span>
      <span className="font-script lg:h-30 absolute bottom-4 left-4 z-20 w-20 text-7xl font-bold text-white/50 lg:bottom-8 lg:left-10 lg:w-36 lg:text-9xl">
        V
      </span>
      <span className="font-script lg:h-30 absolute bottom-4 right-4 z-20 w-20 text-7xl font-bold text-white/50 lg:bottom-8 lg:right-10 lg:w-36 lg:text-9xl">
        P
      </span>

      <ScrollReveal variant="fade-up" duration={1}>
        <h2 className="z-20 text-7xl text-white lg:text-8xl">
          {simpleBlockTitle}
        </h2>
      </ScrollReveal>
    </ParallaxBackground>
  );
};

export default SimpleBlockBannerRsvp;
