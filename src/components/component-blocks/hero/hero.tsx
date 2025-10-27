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
        {heroTitle && <h2 className="text-8xl">{heroTitle}</h2>}
        {heroSubtitle && (
          <h3 className="font-serif font-normal">{heroSubtitle}</h3>
        )}
        {heroCaption && <p className="font-mono font-medium">{heroCaption}</p>}
        {heroBody && <p className="whitespace-pre-line">{heroBody}</p>}
      </div>
    </section>
  );
}
