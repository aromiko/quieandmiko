import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockGallery = ({
  simpleBlockBody1,
  simpleBlockImage1,
  simpleBlockImage2,
  simpleBlockImage3,
  simpleBlockImage4,
  simpleBlockImage5
}: TypeComponentSimpleBlock) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-8 py-16 lg:flex-row lg:px-12">
      <div className="lg:mr-15 flex w-full flex-col items-center gap-16 lg:w-1/2">
        {simpleBlockImage1 && (
          <BasicMedia
            data={simpleBlockImage1}
            wrapperCssClass="h-[300px] lg:h-[550px] aspect-[9/11]"
            imageCssClass="object-cover"
          />
        )}
        <p className="object max-w-xs text-center font-mono font-light lg:max-w-md">
          {simpleBlockBody1}
        </p>
      </div>
      <div className="lg:ml-15 flex w-full flex-col items-center justify-center gap-16 lg:w-1/2 lg:items-start lg:gap-24">
        <div className="flex gap-8">
          {simpleBlockImage2 && (
            <BasicMedia
              data={simpleBlockImage2}
              wrapperCssClass="h-[75px] lg:h-[150px] aspect-[1/1] mt-10"
            />
          )}
          {simpleBlockImage3 && (
            <BasicMedia
              data={simpleBlockImage3}
              wrapperCssClass="h-[200px] lg:h-[283px] aspect-[0.82/1]"
              imageCssClass="object-cover"
            />
          )}
        </div>
        <div className="flex gap-8">
          {simpleBlockImage4 && (
            <BasicMedia
              data={simpleBlockImage4}
              wrapperCssClass="h-[225px] lg:h-[325px] aspect-[0.81/1]"
              imageCssClass="object-cover object-top"
            />
          )}
          {simpleBlockImage5 && (
            <BasicMedia
              data={simpleBlockImage5}
              wrapperCssClass="h-[133px] lg:h-[237px] aspect-[0.56/1] rotate-[7.98deg] -mt-20 lg:-mt-35"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleBlockGallery;
