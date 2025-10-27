import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentHero } from "@/lib/types";

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
          <BasicMedia data={heroImage} wrapperCssClass="w-100 h-100" />
        )}
        {heroTitle && <h2 className="text-6xl sm:text-8xl">{heroTitle}</h2>}
        {heroSubtitle && (
          <h3 className="font-serif text-2xl font-normal sm:text-4xl">
            {heroSubtitle}
          </h3>
        )}
        {heroCaption && (
          <p className="font-mono text-lg font-medium sm:text-xl">
            {heroCaption}
          </p>
        )}
        {heroBody && (
          <p className="whitespace-pre-line text-base sm:text-lg">{heroBody}</p>
        )}
      </div>
    </section>
  );
}
