import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentSimpleBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import { Gift } from "lucide-react";

const SimpleBlockGift = ({
  simpleBlockTitle,
  simpleBlockSubtitle,
  simpleBlockClassName,
  simpleBlockBody1,
  simpleBlockImage1,
  simpleBlockImage2,
  simpleBlockImage3,
  simpleBlockImage4,
  simpleBlockImage5
}: TypeComponentSimpleBlock) => {
  const paymentMethods = [
    { label: "BPI", image: simpleBlockImage3 },
    { label: "GCASH", image: simpleBlockImage4 },
    { label: "MAYA", image: simpleBlockImage5 }
  ].filter((method) => method.image);

  return (
    <section
      className={cn(
        "container mx-auto flex min-h-screen flex-col items-center px-8 py-16 lg:px-12",
        simpleBlockClassName
      )}
    >
      {/* Title */}
      {simpleBlockTitle && (
        <h2 className="leading-16 z-20 my-20 max-w-4xl text-center text-6xl lg:text-7xl">
          {simpleBlockTitle}
        </h2>
      )}

      {/* Couple Images */}
      {(simpleBlockImage1 || simpleBlockImage2) && (
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {simpleBlockImage1 && (
            <div className="group relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <BasicMedia
                data={simpleBlockImage1}
                wrapperCssClass="w-[220px] lg:w-[300px] aspect-[3/4]"
                imageCssClass="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="400px"
              />
              <div className="from-wine/20 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          )}
          {simpleBlockImage2 && (
            <div className="group relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <BasicMedia
                data={simpleBlockImage2}
                wrapperCssClass="w-[220px] lg:w-[300px] aspect-[3/4]"
                imageCssClass="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="400px"
              />
              <div className="from-wine/20 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          )}
        </div>
      )}

      {/* Message */}
      {simpleBlockSubtitle && (
        <div className="my-16 max-w-2xl text-center">
          <p className="text-coffee/80 font-serif text-xl leading-relaxed tracking-wide lg:text-2xl">
            {simpleBlockSubtitle}
          </p>
        </div>
      )}

      {/* Decorative Divider */}
      {paymentMethods.length > 0 && (
        <div className="mb-12 flex items-center gap-4">
          <div className="to-wine/40 h-px w-16 bg-gradient-to-r from-transparent" />
          <div className="border-wine/30 bg-wine/5 flex size-12 items-center justify-center rounded-full border-2">
            <Gift className="text-wine size-5" />
          </div>
          <div className="to-wine/40 h-px w-16 bg-gradient-to-l from-transparent" />
        </div>
      )}

      {/* QR Code Cards */}
      {paymentMethods.length > 0 && (
        <div className="flex flex-wrap items-stretch justify-center gap-6 lg:gap-20">
          {paymentMethods.map((method) => (
            <div
              key={method.label}
              className="border-wine/20 hover:border-wine/40 group relative flex flex-col items-center rounded-xl border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Label Badge */}
              <div className="border-wine/30 bg-wine/5 mb-4 rounded-full border px-5 py-1.5">
                <span className="text-wine font-mono text-sm font-semibold tracking-widest">
                  {method.label}
                </span>
              </div>

              {/* QR Code */}
              <div className="relative overflow-hidden rounded-lg bg-white p-2 transition-transform duration-300 group-hover:scale-[1.02]">
                <BasicMedia
                  data={method.image!}
                  wrapperCssClass="w-[180px] lg:w-[200px] aspect-square"
                  imageCssClass="object-contain"
                  sizes="250px"
                />
              </div>

              {/* Scan hint */}
              <p className="text-coffee/50 mt-4 text-xs">Scan to send</p>
            </div>
          ))}
        </div>
      )}

      {/* Closing Message */}
      {simpleBlockBody1 && (
        <div className="mt-16 max-w-xl text-center">
          <p className="text-coffee/70 font-serif text-lg leading-relaxed tracking-wide lg:text-xl">
            {simpleBlockBody1}
          </p>
        </div>
      )}
    </section>
  );
};

export default SimpleBlockGift;
