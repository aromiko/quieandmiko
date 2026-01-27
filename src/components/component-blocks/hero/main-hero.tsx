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
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-12 py-16">
      <div>
        {mainHeroMonogram && (
          <BasicMedia
            data={mainHeroMonogram}
            wrapperCssClass="w-50 h-50 lg:w-[350px] lg:h-[350px] z-10"
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
          wrapperCssClass="h-40 w-40 lg:h-[240px] lg:w-[240px] z-10 -mt-10 lg:-mt-16"
        />
      )}

      {mainHeroImagesCollection?.items.map((image, index) => {
        const positions = [
          "top-56 -left-18 lg:top-56 lg:-left-18 rotate-[-101.07deg]",
          "top-62 -left-8 lg:top-62 lg:-left-8 rotate-[31.84deg]",
          "bottom-32 -left-2 lg:bottom-32 lg:left-24 rotate-[-15.95deg] lg:rotate-[-4.95deg]",
          "top-4 right-24 lg:top-50 lg:right-34 rotate-[8.33deg]",
          "top-24 -right-10 lg:top-80 lg:right-0 rotate-[-18.53deg]"
        ];

        const sizes = [
          "w-[170px] h-[240px] lg:w-[255px] lg:h-[360px]",
          "w-[120px] h-[150px] lg:w-[198px] lg:h-[248px]",
          "w-[150px] h-[96px] lg:w-[218px] lg:h-[141px]",
          "w-[112px] h-[150px] lg:w-[158px] lg:h-[211px]",
          "w-[150px] h-[200px] lg:w-[186px] lg:h-[248px]"
        ];

        return (
          <div
            key={index}
            className={cn(
              "outline-6 saturate shadow-lg/50 absolute z-0 outline-white",
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
