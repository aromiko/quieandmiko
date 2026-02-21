import BasicLink from "@/components/building-blocks/basic-link/basic-link";
import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import ParallaxBackground from "@/components/component-blocks/animation-wrapper/parallax-background";
import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { Button } from "@/components/ui/button";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockRsvp = ({
  simpleBlockTitle,
  simpleBlockSubtitle,
  simpleBlockCta,
  simpleBlockImage1,
  simpleBlockImage1Position,
  simpleBlockImage2
}: TypeComponentSimpleBlock) => {
  return (
    <ParallaxBackground
      imageUrl={simpleBlockImage1?.basicMediaImage.url}
      imagePosition={simpleBlockImage1Position || "center center"}
      overlay="bg-black/50"
      className="h-144"
    >
      {/* Foreground content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center lg:w-2/3">
          {simpleBlockSubtitle && (
            <ScrollReveal variant="fade-up" delay={0.1}>
              <p className="text-cream font-serif text-lg lg:text-2xl">
                {simpleBlockSubtitle}
              </p>
            </ScrollReveal>
          )}

          {simpleBlockTitle && (
            <ScrollReveal
              variant="fade-up"
              delay={0.25}
              duration={0.9}
              className="w-full text-center"
            >
              <h2 className="text-cream z-10 text-7xl lg:text-9xl">
                {simpleBlockTitle}
              </h2>
            </ScrollReveal>
          )}

          {simpleBlockCta && (
            <ScrollReveal variant="fade-up" delay={0.4}>
              <Button
                variant={"outline"}
                inverted
                asChild
                size={"lg"}
                className="mt-8"
              >
                <BasicLink data={simpleBlockCta} />
              </Button>
            </ScrollReveal>
          )}
        </div>

        <div className="flex w-full justify-center lg:w-1/3">
          {simpleBlockImage2 && (
            <ScrollReveal variant="fade-left" delay={0.5}>
              <BasicMedia
                data={simpleBlockImage2}
                wrapperCssClass="w-[450px] aspect-[2.8/1] shadow-lg/50 rotate-[-8.47deg] lg:-ml-40 mt-20 lg:mt-50"
                sizes="450px"
              />
            </ScrollReveal>
          )}
        </div>
      </div>
    </ParallaxBackground>
  );
};

export default SimpleBlockRsvp;
