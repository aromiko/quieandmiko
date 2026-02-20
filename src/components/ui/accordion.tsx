"use client";

import { cn } from "@/lib/utils/classnames";
import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import * as React from "react";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("group/item border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "text-coffee [&[data-state=open]]:text-wine group flex flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left font-serif text-lg font-normal italic tracking-wide outline-none transition-all duration-300 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:text-xl [&[data-state=open]>span>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <span className="bg-sugar/40 group-data-[state=open]:bg-wine/10 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300">
          <ChevronDownIcon className="text-coffee/50 group-data-[state=open]:text-wine size-4 transition-transform duration-300 ease-out" />
        </span>
      </AccordionPrimitive.Trigger>
      {/* Decorative divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <div className="via-sugar/60 h-px bg-gradient-to-r from-transparent to-transparent" />
      </div>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div
        className={cn(
          "border-sugar/50 ml-1 border-l-2 pb-6 pl-6 pt-2",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
