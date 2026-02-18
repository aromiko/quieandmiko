import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockBanner = ({
  simpleBlockTitle,
  simpleBlockImage1
}: TypeComponentSimpleBlock) => {
  return (
    <section
      className="h-144 flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${simpleBlockImage1?.basicMediaImage.url})`
      }}
    >
      <div className="h-144 absolute inset-0 bg-black/35" />
      <ScrollReveal variant="fade-up" duration={1}>
        <h2 className="relative z-20 text-7xl text-white lg:text-8xl">
          {simpleBlockTitle}
        </h2>
      </ScrollReveal>
    </section>
  );
};

export default SimpleBlockBanner;
