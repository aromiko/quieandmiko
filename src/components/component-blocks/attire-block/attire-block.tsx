import { TypeComponentAttireBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import AttireCard from "../attire-card/attire-card";

const AttireBlock = ({
  attireBlockTitle,
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
      <h2 className="text-coffee text-7xl">{attireBlockTitle}</h2>

      {attireBlockCardsCollection && (
        <div className="mt-12 flex w-full flex-col flex-wrap items-center justify-center gap-6 lg:flex-row">
          {attireBlockCardsCollection.items.map((attireCard, index) => {
            return <AttireCard key={index} {...attireCard} />;
          })}
        </div>
      )}

      <p className="text-coffee mt-10 max-w-md text-center font-mono text-sm font-light">
        {attireBlockBody}
      </p>
    </section>
  );
};

export default AttireBlock;
