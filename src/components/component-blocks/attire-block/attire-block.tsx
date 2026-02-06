import { ComponentRegistry } from "@/lib/configurations/component-registry";
import {
  TypeComponentAttireBlock,
  TypeComponentAttireCard,
  TypeComponentImageCarousel
} from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import AttireCard from "../attire-card/attire-card";
import ImageCarousel from "../image-carousel/image-carousel";

const AttireBlock = ({
  attireBlockTitle,
  attireBlockSubtitle,
  attireBlockBody,
  attireBlockCardsCollection,
  attireBlockClassName
}: TypeComponentAttireBlock) => {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center px-8 py-16 lg:px-12",
        attireBlockClassName
      )}
    >
      <h2 className="text-coffee text-7xl lg:text-8xl">{attireBlockTitle}</h2>

      {attireBlockSubtitle && (
        <h3 className="text-coffee mt-12 text-center font-serif text-2xl lg:max-w-xl lg:text-3xl">
          {attireBlockSubtitle}
        </h3>
      )}

      {attireBlockCardsCollection && (
        <div className="mt-12 flex w-full flex-col flex-wrap items-center justify-center gap-6 lg:flex-row">
          {attireBlockCardsCollection.items.map((item) => {
            if (item.__typename === ComponentRegistry.AttireCard) {
              return (
                <AttireCard
                  key={item.sys.id}
                  {...(item as TypeComponentAttireCard)}
                />
              );
            } else if (item.__typename === ComponentRegistry.ImageCarousel) {
              return (
                <div key={item.sys.id} className="w-[311px] md:w-[410px]">
                  <ImageCarousel {...(item as TypeComponentImageCarousel)} />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      <p className="text-coffee mt-10 max-w-md text-center font-mono text-sm font-light lg:text-base">
        {attireBlockBody}
      </p>
    </section>
  );
};

export default AttireBlock;
