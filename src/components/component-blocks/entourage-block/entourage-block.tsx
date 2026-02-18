import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentEntourageBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import EntourageGroup from "../entourage-group/entourage-group";

const EntourageBlock = ({
  entourageBlockTitle,
  entourageBlockBackgroundImage,
  entourageBlockBackgroundOverlay,
  entourageBlockImage,
  entourageBlockGroupsCollection,
  entourageBlockClassName
}: TypeComponentEntourageBlock) => {
  return (
    <section
      className={cn(
        "container relative mx-auto flex flex-col items-center justify-center px-8 py-16 xl:px-32",
        entourageBlockClassName
      )}
    >
      {entourageBlockTitle && (
        <h2 className="z-20 text-7xl lg:text-8xl">{entourageBlockTitle}</h2>
      )}

      {entourageBlockImage && (
        <BasicMedia
          data={entourageBlockImage}
          wrapperCssClass="aspect-[0.81/1] w-[100px] lg:w-[141px] absolute right-2 lg:right-24 top-32 z-10"
          imageCssClass="object-cover object-left lg:object-center"
          sizes="(min-width: 1024px) 141px, 100px"
        />
      )}

      <div
        style={{
          backgroundImage: `url(${entourageBlockBackgroundImage?.basicMediaImage.url})`
        }}
        className="bg-matcha relative mx-8 my-16 flex w-full flex-wrap overflow-hidden bg-contain px-8 py-20 lg:mx-32 lg:px-20"
      >
        {entourageBlockBackgroundOverlay && (
          <div
            className="h-300 bg-size-[auto_1000px] pointer-events-none absolute left-0 z-0 w-full bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: `url(${entourageBlockBackgroundOverlay?.basicMediaImage.url})`
            }}
          />
        )}

        {entourageBlockGroupsCollection?.items &&
          entourageBlockGroupsCollection?.items.length > 0 &&
          entourageBlockGroupsCollection?.items.map((entourageGroup, index) => (
            <EntourageGroup
              key={entourageGroup.sys.id}
              {...entourageGroup}
              entourageGroupClassName={cn("w-full md:w-1/2", {
                "mt-16": entourageGroup.entourageGroupTitle && index > 0,
                "md:mt-0": index < 2,
                "md:mt-10": index > 1
              })}
            />
          ))}
      </div>
    </section>
  );
};

export default EntourageBlock;
