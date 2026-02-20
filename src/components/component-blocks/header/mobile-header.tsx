"use client";

import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { TypeComponentBasicMedia } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type MobileHeaderProps = {
  links: {
    linkText?: string | null;
    linkUrl?: string | null;
  }[];
  variant?: "solid" | "transparent";
  logo?: TypeComponentBasicMedia;
};

export default function MobileHeader({
  links,
  variant,
  logo
}: MobileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full items-center lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            aria-label="Open menu"
            className="p-2"
            variant={"ghost"}
            size={"icon"}
          >
            <Menu
              className={cn("text-cream size-9", {
                "group-data-[scrolled=false]:text-wine": variant === "solid"
              })}
            />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[280px] transition-transform duration-300 ease-out [&>button]:hidden"
        >
          <SheetHeader className="flex h-16 flex-row items-center justify-between p-0 px-4">
            <SheetTitle>
              {logo && (
                <Link
                  href="/"
                  className={cn(
                    "[&_img]:brightness-0",
                    "hover:opacity-50"
                  )}
                >
                  <BasicMedia
                    data={logo}
                    wrapperCssClass="w-16 h-16"
                    sizes="64px"
                  />
                </Link>
              )}
            </SheetTitle>

            <SheetClose asChild>
              <Button aria-label="Close menu" variant={"outline"} size={"icon"}>
                <X className="size-6" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <nav className="mt-6">
            <ul className="flex flex-col gap-4">
              {links.map((link, index) => (
                <li key={link.linkText ? link.linkText + index : index}>
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
