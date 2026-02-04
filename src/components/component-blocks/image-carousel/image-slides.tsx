"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/classnames";
import Image from "next/image";
import * as React from "react";

type Slide = {
  src: string;
  alt: string;
  label?: string;
};

type ImageSlidesProps = {
  slides: Slide[];
  aspect?: "portrait" | "landscape";
};

export default function ImageSlides({
  slides,
  aspect = "portrait"
}: ImageSlidesProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);

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
          {slides.map((slide, i) => (
            <CarouselItem key={i}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg",
                  aspect === "portrait" && "aspect-[3/4]",
                  aspect === "landscape" && "aspect-[16/9]"
                )}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />

                {slide.label && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-3xl tracking-wide text-white lg:text-4xl">
                      {slide.label}
                    </span>
                  </div>
                )}
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
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
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
