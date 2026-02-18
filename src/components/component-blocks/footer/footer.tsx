import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import ParallaxBackground from "@/components/component-blocks/animation-wrapper/parallax-background";
import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
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
    <ParallaxBackground
      imageUrl={footerBackground?.basicMediaImage.url}
      speed={0.25}
      className="h-100 lg:h-144 w-full"
      innerClassName={cn("px-8 py-16 lg:px-12", {
        "items-center": footerVariant === "center",
        "flex-row items-start justify-between": footerVariant === "left"
      })}
    >
      {footerLogo && (
        <BasicMedia
          data={footerLogo}
          wrapperCssClass="w-32 lg:w-40 aspect-[1.7/1] mt-auto"
          imageCssClass="object-contain"
          sizes="(min-width: 1024px) 160px, 128px"
        />
      )}
      {footerText && (
        <ScrollReveal variant="fade" delay={0.2}>
          <div
            className={cn(
              "container z-10 mt-4 flex justify-center p-4 text-center font-mono text-sm font-light text-white lg:text-lg",
              {
                "items-center": footerVariant === "center",
                "h-full items-end": footerVariant === "left"
              }
            )}
          >
            {footerText}
          </div>
        </ScrollReveal>
      )}
      <div
        className={cn("flex gap-4 p-4", {
          "h-full items-end": footerVariant === "left"
        })}
      >
        {footerLinksCollection?.items &&
          footerLinksCollection?.items.length > 0 &&
          footerLinksCollection?.items.map((footerLink) => {
            const Icon = ICON_MAP[footerLink.linkText || ""];

            return (
              <a
                href={footerLink.linkUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                key={footerLink.linkText}
                aria-label={`Visit our ${footerLink.linkText} (opens in new tab)`}
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
    </ParallaxBackground>
  );
}
