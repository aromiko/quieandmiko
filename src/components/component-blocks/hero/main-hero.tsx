import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentMainHero } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

export default function MainHero({
  mainHeroTitle,
  mainHeroMonogram,
  mainHeroInitials1,
  mainHeroInitials2,
  mainHeroDateBadge,
  mainHeroImagesCollection
}: TypeComponentMainHero) {
  console.log(mainHeroImagesCollection);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-12 py-16">
      <div>
        {mainHeroMonogram && (
          <BasicMedia
            data={mainHeroMonogram}
            wrapperCssClass="w-50 h-50 md:w-[350px] md:h-[350px] z-10"
          />
        )}
      </div>

      {mainHeroInitials1 && (
        <div className="absolute left-12 top-16 flex flex-col items-center space-y-1 font-mono text-base leading-none text-[#B6AE94]">
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
            <h1 className="font-script z-10 text-7xl text-[#5b1a12] md:text-9xl">
              <span>{first}</span>{" "}
              <span className="relative -top-6 mx-1 inline-block rotate-[-20deg] text-5xl md:-top-8 md:text-7xl">
                and
              </span>{" "}
              <span className="-ml-5">{second}</span>
            </h1>
          );
        })()}

      {mainHeroInitials2 && (
        <div className="absolute bottom-16 right-12 flex flex-col items-center space-y-1 font-mono text-base leading-none text-[#B6AE94]">
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
          wrapperCssClass="h-40 w-40 md:h-[240px] md:w-[240px] z-10 -mt-10 md:-mt-16"
        />
      )}

      {mainHeroImagesCollection?.items.map((image, index) => {
        const positions = [
          "top-56 -left-18 md:top-56 md:-left-18 rotate-[-101.07deg]",
          "top-62 -left-8 md:top-62 md:-left-8 rotate-[31.84deg]",
          "bottom-32 -left-2 md:bottom-32 md:left-24 rotate-[-15.95deg] md:rotate-[-4.95deg]",
          "top-4 right-24 md:top-50 md:right-34 rotate-[8.33deg]",
          "top-24 -right-10 md:top-80 md:right-0 rotate-[-18.53deg]"
        ];

        const sizes = [
          "w-[170px] h-[240px] md:w-[255px] md:h-[360px]",
          "w-[120px] h-[150px] md:w-[198px] md:h-[248px]",
          "w-[150px] h-[96px] md:w-[218px] md:h-[141px]",
          "w-[112px] h-[150px] md:w-[158px] md:h-[211px]",
          "w-[150px] h-[200px] md:w-[186px] md:h-[248px]"
        ];

        return (
          <div
            key={index}
            className={cn(
              "outline-6 saturate absolute z-0 shadow-lg outline-white",
              positions[index] ?? ""
            )}
          >
            <BasicMedia
              data={image}
              wrapperCssClass={cn({
                "saturate-[0.2]": index === 1,
                [sizes[index] ?? ""]: true
              })}
            />
          </div>
        );
      })}
    </section>
  );
}
