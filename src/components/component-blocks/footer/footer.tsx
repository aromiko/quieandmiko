import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentFooter } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import { ICON_MAP } from "@/lib/utils/icon-map";

export default function Footer({
  footerText,
  footerBackground,
  footerLogo,
  footerVariant,
  footerLinksCollection
}: TypeComponentFooter) {
  return (
    <section
      className={cn(
        "h-100 lg:h-144 relative flex w-full flex-col bg-cover bg-center",
        {
          "items-center": footerVariant === "center"
        }
      )}
      style={{
        backgroundImage: `url(${footerBackground?.basicMediaImage.url})`
      }}
    >
      {footerLogo && (
        <BasicMedia
          data={footerLogo}
          wrapperCssClass="w-32 lg:w-40 aspect-[1.7/1] mt-auto"
          imageCssClass="object-contain"
          sizes="(min-width: 1024px) 160px, 128px"
        />
      )}
      <div className="container z-10 mt-4 p-4 text-center font-mono text-sm font-light text-white lg:text-lg">
        {footerText}
      </div>
      <div className="mb-12 flex gap-4 p-4 lg:mb-24">
        {footerLinksCollection?.items &&
          footerLinksCollection?.items.length > 0 &&
          footerLinksCollection?.items.map((footerLink) => {
            const Icon = ICON_MAP[footerLink.linkText || ""];

            return (
              <a
                href={footerLink.linkUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-50"
                key={footerLink.linkText}
              >
                {Icon && (
                  <Icon
                    className="size-8 lg:size-10"
                    strokeWidth={1.5}
                    color="white"
                  />
                )}
              </a>
            );
          })}
      </div>
    </section>
  );
}
