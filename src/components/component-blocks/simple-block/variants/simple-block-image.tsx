import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

const SimpleBlockImage = ({
  simpleBlockImage1,
  simpleBlockImage1Position
}: TypeComponentSimpleBlock) => {
  return (
    <section className="h-100 md:h-200 flex items-center justify-center">
      {simpleBlockImage1 && (
        <BasicMedia
          data={simpleBlockImage1}
          wrapperCssClass="w-[300px] md:w-[550px] lg:w-[715px] aspect-[1.79/1]"
          imageCssClass={cn("object-cover", {
            "object-top": simpleBlockImage1Position === "top",
            "object-bottom": simpleBlockImage1Position === "bottom"
          })}
        />
      )}
    </section>
  );
};

export default SimpleBlockImage;
