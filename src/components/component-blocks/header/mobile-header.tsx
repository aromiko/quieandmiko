"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/classnames";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type MobileHeaderProps = {
  links: {
    linkText?: string | null;
    linkUrl?: string | null;
  }[];
  variant?: "solid" | "transparent";
};

export default function MobileHeader({ links, variant }: MobileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button aria-label="Open menu" className="p-2">
            <Menu
              className={cn("text-cream h-6 w-6", {
                "group-data-[scrolled=false]:text-wine": variant === "solid"
              })}
            />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[280px] transition-transform duration-300 ease-out"
        >
          <SheetHeader>
            <SheetTitle className="font-serif text-xl">Quie & Miko</SheetTitle>
          </SheetHeader>

          <nav className="mt-6">
            <ul className="flex flex-col gap-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.linkUrl ?? "/"}
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start font-mono text-lg"
                    )}
                  >
                    {link.linkText}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
