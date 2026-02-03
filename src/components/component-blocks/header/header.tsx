import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { buttonVariants } from "@/components/ui/button";
import { TypeComponentHeader } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import Link from "next/link";

import MobileHeader from "./mobile-header";

export default function Header({
  headerLogo,
  headerLinksCollection,
  headerVariant
}: TypeComponentHeader) {
  return (
    <div className="h-16 justify-items-center bg-transparent transition duration-300 group-data-[scrolled=true]:bg-black/40">
      <nav className="mx-auto flex h-full w-full items-center justify-between px-4 font-bold lg:container">
        <Link
          href="/"
          className={cn(
            "p-0",
            buttonVariants({ variant: "link" }),
            {
              "group-data-[scrolled=true]:filter-[brightness(0)_invert(1)]":
                headerVariant === "solid"
            },
            "hover:opacity-50"
          )}
        >
          {headerLogo && (
            <BasicMedia data={headerLogo} wrapperCssClass="w-16 h-16" />
          )}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden flex-row gap-4 md:flex">
          {headerLinksCollection?.items?.map((headerLink, index) => (
            <li className={cn("font-serif")} key={index}>
              <Link
                href={headerLink.linkUrl ?? "/"}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  {
                    "text-cream": headerVariant === "transparent"
                  },
                  "group-data-[scrolled=true]:text-cream"
                )}
              >
                {headerLink.linkText}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile nav (client) */}
        <MobileHeader
          links={headerLinksCollection?.items ?? []}
          variant={headerVariant}
          logo={headerLogo}
        />
      </nav>
    </div>
  );
}
