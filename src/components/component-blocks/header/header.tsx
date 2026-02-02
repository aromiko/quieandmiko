import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { buttonVariants } from "@/components/ui/button";
import { TypeComponentHeader } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import Link from "next/link";

import MobileHeader from "./mobile-header";

export default function Header({
  headerLogo,
  headerLinksCollection
}: TypeComponentHeader) {
  return (
    <div className="justify-items-center">
      <div className="container flex items-center justify-between p-4 font-bold">
        {headerLogo && <BasicMedia data={headerLogo} />}

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "link" }),
            "font-serif text-2xl font-bold"
          )}
        >
          Quie & Miko
        </Link>

        {/* Desktop nav */}
        <ul className="hidden flex-row gap-4 md:flex">
          {headerLinksCollection?.items?.map((headerLink, index) => (
            <li className="font-serif" key={index}>
              <Link
                href={headerLink.linkUrl ?? "/"}
                className={cn(buttonVariants({ variant: "link" }))}
              >
                {headerLink.linkText}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile nav (client) */}
        <MobileHeader links={headerLinksCollection?.items ?? []} />
      </div>
    </div>
  );
}
