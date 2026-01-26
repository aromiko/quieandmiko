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
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-12 py-20">
      <div>
        {mainHeroMonogram && (
          <BasicMedia
            data={mainHeroMonogram}
            wrapperCssClass="w-[350px] h-[350px] z-10"
          />
        )}
      </div>

      {mainHeroInitials1 && (
        <div className="absolute left-12 top-20 flex flex-col items-center space-y-1 font-mono text-base leading-none text-[#B6AE94]">
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
            <h1 className="font-script z-10 text-9xl text-[#5b1a12]">
              <span>{first}</span>{" "}
              <span className="relative -top-8 mx-1 inline-block rotate-[-20deg] text-7xl">
                and
              </span>{" "}
              <span className="-ml-5">{second}</span>
            </h1>
          );
        })()}

      {mainHeroInitials2 && (
        <div className="absolute bottom-20 right-12 flex flex-col items-center space-y-1 font-mono text-base leading-none text-[#B6AE94]">
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
          wrapperCssClass="mt-4 h-[240px] w-[240px] z-10"
        />
      )}

      {mainHeroImagesCollection?.items.map((image, index) => {
        const positions = [
          "top-56 -left-18 rotate-[-101.07deg]",
          "top-62 -left-8 rotate-[31.84deg]",
          "bottom-32 left-24 rotate-[-4.95deg]",
          "top-50 right-34 rotate-[8.33deg]",
          "top-80 right-0 rotate-[-18.53deg]"
        ];

        const sizes = [
          "w-[255px] h-[360px]",
          "w-[198px] h-[248px]",
          "w-[218px] h-[141px]",
          "w-[158px] h-[211px]",
          "w-[186px] h-[248px]"
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
