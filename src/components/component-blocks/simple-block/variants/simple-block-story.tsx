import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockStory = ({
  simpleBlockTitle,
  simpleBlockBody1,
  simpleBlockBody2,
  simpleBlockImage1,
  simpleBlockImage2,
  simpleBlockImage3
}: TypeComponentSimpleBlock) => {
  return (
    <section className="flex min-h-screen flex-col items-center px-8 py-16 lg:justify-center lg:px-12">
      {simpleBlockImage1 && (
        <BasicMedia
          data={simpleBlockImage1}
          wrapperCssClass="w-full lg:w-[1000px] lg:h-[700px] lg:absolute aspect-[10/7]"
        />
      )}
      <div className="absolute z-10 flex aspect-[10/7] w-full lg:h-[700px] lg:w-[1000px] lg:pb-16 lg:pt-8">
        <div className="flex w-1/2 flex-col items-center justify-center lg:ml-24 lg:p-8">
          {simpleBlockTitle && (
            <h2 className="ml-18 mb-12 text-4xl md:text-5xl lg:mb-0 lg:ml-0 lg:text-6xl">
              {simpleBlockTitle}
            </h2>
          )}
          {simpleBlockBody1 && (
            <p className="hidden text-sm lg:mr-16 lg:mt-4 lg:block">
              {simpleBlockBody1}
            </p>
          )}
          {simpleBlockBody2 && (
            <p className="hidden text-right text-sm lg:mt-8 lg:block lg:pl-16">
              {simpleBlockBody2}
            </p>
          )}
        </div>
        <div className="lg:mr-18 relative flex w-1/2 flex-col items-center justify-center">
          {simpleBlockImage2 && (
            <BasicMedia
              data={simpleBlockImage2}
              wrapperCssClass="w-[50%] lg:w-[400px] absolute z-10 rotate-[-6.65deg] bottom-15 right-5 lg:-bottom-10 lg:-right-20 aspect-[1.5/1]"
            />
          )}
          {simpleBlockImage3 && (
            <BasicMedia
              data={simpleBlockImage3}
              wrapperCssClass="w-1/2 lg:w-[213px] mr-14 mb-14 lg:mb-0 lg:mr-0 lg:h-[319px] aspect-[0.67/1]"
            />
          )}
        </div>
      </div>
      <div>
        {simpleBlockBody1 && (
          <p className="mr-10 mt-4 block lg:hidden">{simpleBlockBody1}</p>
        )}
        {simpleBlockBody2 && (
          <p className="mt-8 block pl-10 text-right lg:hidden">
            {simpleBlockBody2}
          </p>
        )}
      </div>
    </section>
  );
};

export default SimpleBlockStory;
