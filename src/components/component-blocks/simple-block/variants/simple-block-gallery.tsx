import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

const SimpleBlockGallery = ({
  simpleBlockBody1,
  simpleBlockImage1,
  simpleBlockImage2,
  simpleBlockImage3,
  simpleBlockImage4,
  simpleBlockImage5,
  simpleBlockClassName,
  simpleBlockMoreInfo,
  simpleBlockMoreInfoLink
}: TypeComponentSimpleBlock) => {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center px-8 py-16 lg:px-12",
        simpleBlockClassName
      )}
    >
      <div className="flex flex-col items-center justify-center gap-16 lg:flex-row lg:gap-10">
        <div className="lg:mr-15 flex w-full flex-col items-center gap-16 lg:w-1/2">
          {simpleBlockImage1 && (
            <BasicMedia
              data={simpleBlockImage1}
              wrapperCssClass="h-[300px] lg:h-[530px] aspect-[9/11]"
              imageCssClass="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
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
                sizes="(min-width: 1024px) 150px, 75px"
              />
            )}
            {simpleBlockImage3 && (
              <BasicMedia
                data={simpleBlockImage3}
                wrapperCssClass="h-[200px] lg:h-[283px] aspect-[0.82/1]"
                imageCssClass="object-cover"
                sizes="(min-width: 1024px) 233px, 164px"
              />
            )}
          </div>
          <div className="flex gap-8">
            {simpleBlockImage4 && (
              <BasicMedia
                data={simpleBlockImage4}
                wrapperCssClass="h-[225px] lg:h-[325px] aspect-[0.81/1]"
                imageCssClass="object-cover object-top"
                sizes="(min-width: 1024px) 263px, 182px"
              />
            )}
            {simpleBlockImage5 && (
              <BasicMedia
                data={simpleBlockImage5}
                wrapperCssClass="h-[133px] lg:h-[237px] aspect-[0.56/1] rotate-[7.98deg] -mt-20 lg:-mt-35"
                sizes="(min-width: 1024px) 133px, 75px"
              />
            )}
          </div>
        </div>
      </div>
      {simpleBlockMoreInfo && (
        <div className="display mt-16 text-center">
          <p className="font-mono text-lg font-light">{simpleBlockMoreInfo}</p>
          {simpleBlockMoreInfoLink && (
            <a
              href={simpleBlockMoreInfoLink.linkUrl}
              className="text-wine font-serif text-2xl hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {simpleBlockMoreInfoLink.linkText}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default SimpleBlockGallery;
