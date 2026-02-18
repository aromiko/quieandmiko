import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentHero } from "@/lib/types";
import { sanitizeAndParse } from "@/lib/utils/sanitizer-parser";

export default function Hero({
  heroTitle,
  heroSubtitle,
  heroCaption,
  heroBody,
  heroImage
}: TypeComponentHero) {
  return (
    <section className="justify-items-center">
      <div className="lg:w-2xl container my-20 justify-center justify-items-center space-y-2 p-4 text-center">
        {heroImage && (
          <ScrollReveal variant="scale" duration={0.9}>
            <BasicMedia data={heroImage} wrapperCssClass="w-100 h-100" />
          </ScrollReveal>
        )}
        {heroTitle && (
          <ScrollReveal variant="fade-up" delay={0.1}>
            <h2 className="text-6xl sm:text-8xl">{heroTitle}</h2>
          </ScrollReveal>
        )}
        {heroSubtitle && (
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h3 className="font-serif text-2xl font-normal sm:text-4xl">
              {heroSubtitle}
            </h3>
          </ScrollReveal>
        )}
        {heroCaption && (
          <ScrollReveal variant="fade" delay={0.3}>
            <p className="font-mono text-lg font-medium sm:text-xl">
              {heroCaption}
            </p>
          </ScrollReveal>
        )}
        {heroBody && (
          <ScrollReveal variant="fade" delay={0.4}>
            <p className="whitespace-pre-line text-base sm:text-lg">
              {sanitizeAndParse(heroBody)}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
