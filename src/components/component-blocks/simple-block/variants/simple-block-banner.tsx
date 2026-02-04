import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockBanner = ({
  simpleBlockTitle,
  simpleBlockImage1
}: TypeComponentSimpleBlock) => {
  return (
    <section className="h-144 relative flex items-center justify-center overflow-hidden">
      {/* Background image */}
      {simpleBlockImage1 && (
        <div className="absolute inset-0 -left-12 z-0 lg:left-0">
          <BasicMedia
            data={simpleBlockImage1}
            wrapperCssClass="w-full h-full"
            imageCssClass="object-cover object-left lg:object-center"
            sizes="100vw"
          />
        </div>
      )}

      {/* Black overlay */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      <h2 className="z-20 text-7xl text-white lg:text-8xl">
        {simpleBlockTitle}
      </h2>
    </section>
  );
};

export default SimpleBlockBanner;
