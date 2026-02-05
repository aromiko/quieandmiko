"use client";

import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import AttireCard from "@/components/component-blocks/attire-card/attire-card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { TypeComponentAttireCard, TypeComponentBasicMedia } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import * as React from "react";

type ImageSlidesProps = {
  cover?: TypeComponentAttireCard;
  items: TypeComponentBasicMedia[];
};

export default function ImageSlides({ cover, items }: ImageSlidesProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);

  const filteredItems = items.filter((item) => item && item.sys);
  const totalSlides = (cover ? 1 : 0) + filteredItems.length;

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full">
      {/* Swipe hint outside */}
      <div className="mb-2 text-right font-mono text-xs uppercase tracking-widest text-neutral-500">
        <span aria-hidden="true">Swipe to view</span>
        <span className="sr-only">
          Use left and right arrow keys or swipe to navigate slides
        </span>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true
        }}
        className="group relative w-full"
        aria-label="Image carousel"
      >
        <CarouselContent>
          {/* Render AttireCard cover as first slide */}
          {cover && (
            <CarouselItem key={cover.sys.id}>
              <AttireCard {...cover} />
            </CarouselItem>
          )}

          {/* Render BasicMedia items */}
          {filteredItems.map((item) => (
            <CarouselItem key={item.sys.id}>
              <div className="relative aspect-[0.67/1] overflow-hidden rounded-lg">
                <BasicMedia
                  data={{
                    ...item,
                    basicMediaFill: true
                  }}
                  wrapperCssClass="w-full h-full"
                  imageCssClass="object-cover"
                  sizes="(max-width: 768px) 311px, 410px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 bg-black/30 text-white hover:bg-black/50" />
        <CarouselNext className="right-2 bg-black/30 text-white hover:bg-black/50" />

        {/* Indicators */}
        <div
          className="mt-4 flex gap-1 px-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1} of ${totalSlides}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-[2px] w-full cursor-pointer transition-colors duration-300",
                i === current ? "bg-wine" : "bg-neutral-300"
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
