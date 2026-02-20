"use client";

import { cn } from "@/lib/utils/classnames";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxBackgroundProps = {
  children: React.ReactNode;
  imageUrl?: string;
  speed?: number;
  overlay?: string;
  className?: string;
  innerClassName?: string;
  imagePosition?: string;
};

export default function ParallaxBackground({
  children,
  imageUrl,
  speed = 0.3,
  overlay,
  className,
  innerClassName,
  imagePosition = "center"
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax: moves background by ±(speed * 200)px over scroll
  const y = useTransform(scrollYProgress, [0, 1], [speed * -500, speed * 500]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {imageUrl && (
        <motion.div
          className="absolute inset-[-17%] z-0 bg-cover bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: imagePosition,
            y
          }}
        />
      )}

      {overlay && <div className={cn("absolute inset-0 z-[1]", overlay)} />}

      <div
        className={cn(
          "relative z-[2] flex h-full w-full flex-col",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
