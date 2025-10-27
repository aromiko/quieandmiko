import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentHero } from "@/lib/types";

export default function Hero({
  heroTitle,
  heroBody,
  heroImage
}: TypeComponentHero) {
  return (
    <section className="justify-items-center">
      <div className="lg:w-2xl container my-20 justify-center justify-items-center space-y-2 p-4 text-center">
        {heroImage && (
          <BasicMedia data={heroImage} wrapperCssClass="w-100 h-100" />
        )}
        {heroTitle && <h1>{heroTitle}</h1>}
        <h4 className="font-serif">SUBHEADING</h4>
        <p className="font-mono">05.22.2026</p>
        {heroTitle && <p>{heroBody}</p>}
      </div>
    </section>
  );
}
