"use client";

import { cn } from "@/lib/utils/classnames";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type TimelineMapEmbedProps = {
  src: string;
};

export default function TimelineMapEmbed({ src }: TimelineMapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="h-120 relative mt-8 lg:h-96">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader2 className="text-cream h-8 w-8 animate-spin" />
        </div>
      )}

      <iframe
        src={src}
        title="Map location"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className={cn(
          "h-full w-full transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
