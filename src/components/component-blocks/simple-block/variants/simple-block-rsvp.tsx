import BasicLink from "@/components/building-blocks/basic-link/basic-link";
import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { Button } from "@/components/ui/button";
import { TypeComponentSimpleBlock } from "@/lib/types";

const SimpleBlockRsvp = ({
  simpleBlockTitle,
  simpleBlockSubtitle,
  simpleBlockCta,
  simpleBlockImage1,
  simpleBlockImage2
}: TypeComponentSimpleBlock) => {
  return (
    <section className="h-144 relative overflow-hidden">
      {/* Background image */}
      {simpleBlockImage1 && (
        <div className="absolute inset-0 z-0">
          <BasicMedia
            data={{ ...simpleBlockImage1, basicMediaFill: true }}
            wrapperCssClass="w-full h-full"
            imageCssClass="object-cover"
          />
        </div>
      )}

      {/* Black overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Foreground content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center lg:w-2/3">
          {simpleBlockSubtitle && (
            <p className="text-cream font-serif text-lg lg:text-2xl">
              {simpleBlockSubtitle}
            </p>
          )}

          {simpleBlockTitle && (
            <h2 className="text-cream z-10 text-7xl lg:text-9xl">
              {simpleBlockTitle}
            </h2>
          )}

          {simpleBlockCta && (
            <Button
              variant={"outline"}
              inverted
              asChild
              size={"lg"}
              className="mt-8"
            >
              <BasicLink data={simpleBlockCta} />
            </Button>
          )}
        </div>

        <div className="flex w-full justify-center lg:w-1/3">
          {simpleBlockImage2 && (
            <BasicMedia
              data={simpleBlockImage2}
              wrapperCssClass="w-[450px] aspect-[2.8/1] shadow-lg/50 rotate-[-8.47deg] lg:-ml-40 mt-20 lg:mt-50"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleBlockRsvp;
