import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockInvitation = ({
  simpleBlockTitle,
  simpleBlockImage1,
  simpleBlockImage2,
  simpleBlockImage3,
  simpleBlockImage4
}: TypeComponentSimpleBlock) => {
  return (
    <section className="bg-wine flex min-h-screen flex-col items-center justify-center px-8 py-16 lg:px-12">
      {simpleBlockTitle && (
        <h2 className="text-cream mb-12 text-8xl">{simpleBlockTitle}</h2>
      )}

      <div className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
        {simpleBlockImage2 && (
          <BasicMedia
            data={simpleBlockImage2}
            wrapperCssClass="w-40 md:w-50 lg:w-[200px] lg:h-[200px] aspect-[1/1]"
            sizes="(min-width: 1024px) 200px, (min-width: 768px) 200px, 160px"
          />
        )}

        {simpleBlockImage1 && (
          <BasicMedia
            data={simpleBlockImage1}
            wrapperCssClass="hidden lg:block w-full shadow-lg/50 aspect-[1.42/1]"
            sizes="(min-width: 1024px) 60vw, 0px"
          />
        )}

        {simpleBlockImage4 && (
          <BasicMedia
            data={simpleBlockImage4}
            wrapperCssClass="block lg:hidden w-full shadow-lg/50 aspect-[1/1.42]"
            sizes="(min-width: 1024px) 0px, 100vw"
          />
        )}

        {simpleBlockImage3 && (
          <BasicMedia
            data={simpleBlockImage3}
            wrapperCssClass="mt-4 lg:mt-0 w-40 md:w-50 lg:w-[200px] lg:h-[200px] aspect-[1/1]"
            sizes="(min-width: 1024px) 200px, (min-width: 768px) 200px, 160px"
          />
        )}
      </div>
    </section>
  );
};

export default SimpleBlockInvitation;
