import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentAttireCard } from "@/lib/types";

import AttireSection from "./attire-section";

const AttireCard = ({
  attireCardTitle,
  attireCardMenTitle,
  attireCardMenBody,
  attireCardMenColorsTitle,
  attireCardMenColorsCollection,
  attireCardWomenTitle,
  attireCardWomenBody,
  attireCardWomenColorsTitle,
  attireCardWomenColorsCollection,
  attireCardBackground
}: TypeComponentAttireCard) => {
  return (
    <article className="relative flex aspect-[0.67/1] w-[311px] overflow-hidden md:w-[410px]">
      {/* Background image */}
      {attireCardBackground && (
        <div className="absolute inset-0 z-0">
          <BasicMedia
            data={{ ...attireCardBackground, basicMediaFill: true }}
            wrapperCssClass="w-full h-full"
            imageCssClass="object-cover object-left lg:object-center"
          />
        </div>
      )}

      <div className="md:py-30 z-10 flex h-full w-full flex-col items-center px-14 py-20 lg:px-24">
        <div className="flex flex-col items-center">
          <h3 className="max-w-30 flex h-14 items-center text-center font-serif text-lg text-black md:max-w-40 md:text-xl">
            {attireCardTitle}
          </h3>

          <AttireSection
            title={attireCardMenTitle}
            body={attireCardMenBody}
            colorsTitle={attireCardMenColorsTitle}
            colorsCollection={attireCardMenColorsCollection}
          />

          <AttireSection
            title={attireCardWomenTitle}
            body={attireCardWomenBody}
            colorsTitle={attireCardWomenColorsTitle}
            colorsCollection={attireCardWomenColorsCollection}
            className="md:mt-4"
          />
        </div>
      </div>
    </article>
  );
};

export default AttireCard;
