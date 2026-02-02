import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentMainHero } from "@/lib/types";

import HeroImages from "./main-hero-images";

export default function MainHero({
  mainHeroTitle,
  mainHeroMonogram,
  mainHeroInitials1,
  mainHeroInitials2,
  mainHeroDateBadge,
  mainHeroImagesCollection
}: TypeComponentMainHero) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-16 lg:px-12">
      {mainHeroMonogram && (
        <BasicMedia
          data={mainHeroMonogram}
          wrapperCssClass="w-50 h-50 lg:w-[350px] lg:h-[350px] z-10"
        />
      )}

      {mainHeroInitials1 && (
        <div className="absolute left-12 top-12 flex flex-col items-center space-y-1 font-mono text-base leading-none text-[#B6AE94] lg:top-16">
          {mainHeroInitials1
            .split(".")
            .filter(Boolean)
            .map((char, index) => (
              <span key={index}>{char}.</span>
            ))}
        </div>
      )}

      {mainHeroTitle &&
        (() => {
          const [first, , second] = mainHeroTitle.split(" ");

          return (
            <h1 className="font-script text-wine z-10 text-7xl lg:text-9xl">
              <span>{first}</span>{" "}
              <span className="relative -top-6 mx-1 inline-block rotate-[-20deg] text-5xl lg:-top-8 lg:text-7xl">
                and
              </span>{" "}
              <span className="-ml-5">{second}</span>
            </h1>
          );
        })()}

      {mainHeroInitials2 && (
        <div className="absolute bottom-12 right-12 flex flex-col items-center space-y-1 font-mono text-base leading-none text-[#B6AE94] lg:bottom-16">
          {mainHeroInitials2
            .split(".")
            .filter(Boolean)
            .map((char, index) => (
              <span key={index}>{char}.</span>
            ))}
        </div>
      )}

      {mainHeroDateBadge && (
        <BasicMedia
          data={mainHeroDateBadge}
          wrapperCssClass="w-40 lg:w-[240px] z-10 -mt-10 lg:-mt-16 aspect-[1/1]"
        />
      )}

      {/* Client-only animated images */}
      <HeroImages images={mainHeroImagesCollection?.items ?? []} />
    </section>
  );
}
