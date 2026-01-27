import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentFooter } from "@/lib/types";

export default function Footer({
  footerText,
  footerBackground,
  footerLogo
}: TypeComponentFooter) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {footerBackground && (
        <div className="absolute inset-0 z-0">
          <BasicMedia
            data={{ ...footerBackground, basicMediaFill: true }}
            wrapperCssClass="w-full h-full"
            imageCssClass="object-cover object-center"
          />
        </div>
      )}

      {footerLogo && (
        <BasicMedia
          data={footerLogo}
          wrapperCssClass="w-32 lg:w-40 aspect-[1.7/1] mt-auto"
          imageCssClass="object-contain"
        />
      )}
      <div className="container z-10 mb-12 mt-4 p-4 text-center font-mono text-sm font-light text-white lg:mb-24 lg:text-lg">
        {footerText}
      </div>
    </section>
  );
}
