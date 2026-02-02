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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-16 lg:px-12">
      <div>
        {mainHeroMonogram && (
          <BasicMedia
            data={mainHeroMonogram}
            wrapperCssClass="w-50 h-50 lg:w-[350px] lg:h-[350px] z-10"
          />
        )}
      </div>

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

      {mainHeroImagesCollection?.items.map((image, index) => {
        const positions = [
          "bottom-8 lg:bottom-18 -left-24 lg:-left-18 rotate-[-101.07deg]",
          "bottom-6 -left-10 lg:bottom-16 lg:-left-8 rotate-[31.84deg]",
          "-left-12 top-40 lg:left-24 rotate-[-10.95deg] lg:rotate-[-4.95deg]",
          "top-4 right-10 lg:top-30 lg:right-34 rotate-[8.33deg]",
          "top-22 -right-18 lg:top-60 lg:right-0 rotate-[-8.53deg] lg:rotate-[-18.53deg]",
          "bottom-44 -right-6 lg:bottom-32 lg:right-48 rotate-[-5.93deg]"
        ];

        const sizes = [
          "w-[170px] h-[240px] lg:w-[255px] lg:h-[360px]",
          "w-[120px] h-[150px] lg:w-[198px] lg:h-[248px]",
          "w-[150px] h-[96px] lg:w-[218px] lg:h-[141px]",
          "w-[112px] h-[150px] lg:w-[158px] lg:h-[211px]",
          "w-[150px] h-[200px] lg:w-[186px] lg:h-[248px]",
          "w-[120px] h-[120px] lg:w-[160px] lg:h-[160px]"
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
