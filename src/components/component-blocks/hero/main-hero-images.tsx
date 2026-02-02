"use client";

import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentBasicMedia } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import { easeOut, motion } from "framer-motion";

type MainHeroImagesProps = {
  images: TypeComponentBasicMedia[];
};

const positions = [
  "bottom-8 lg:bottom-18 -left-24 lg:-left-18 rotate-[-101.07deg]",
  "bottom-6 -left-10 lg:bottom-16 lg:-left-8 rotate-[31.84deg]",
  "-left-12 top-40 lg:left-24 rotate-[-10.95deg] lg:rotate-[-4.95deg]",
  "top-4 right-10 lg:top-30 lg:right-34 rotate-[8.33deg]",
  "top-22 -right-18 lg:top-60 lg:right-0 rotate-[-8.53deg] lg:rotate-[-18.53deg]",
  "bottom-44 -right-6 lg:bottom-32 lg:right-48 rotate-[-5.93deg]"
];

const sizes = [
  "w-[170px] h-[240px] lg:w-[255px] lg:h-[360px]",
  "w-[120px] h-[150px] lg:w-[198px] lg:h-[248px]",
  "w-[150px] h-[96px] lg:w-[218px] lg:h-[141px]",
  "w-[112px] h-[150px] lg:w-[158px] lg:h-[211px]",
  "w-[150px] h-[200px] lg:w-[186px] lg:h-[248px]",
  "w-[120px] h-[120px] lg:w-[160px] lg:h-[160px]"
];

const imageVariants = {
  hidden: (index: number) => {
    const directions = [
      { x: -300, y: 200 },
      { x: -200, y: 300 },
      { x: -300, y: 0 },
      { x: 300, y: -200 },
      { x: 300, y: 100 },
      { x: 200, y: 300 }
    ];

    return {
      opacity: 0,
      x: directions[index]?.x ?? 0,
      y: directions[index]?.y ?? 200,
      rotate: -15
    };
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 1,
      ease: easeOut,
      delay: index * 0.3
    }
  })
};

export default function HeroImages({ images }: MainHeroImagesProps) {
  return (
    <>
      {images.map((image, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "outline-6 saturate shadow-lg/50 absolute z-0 outline-white",
            positions[index]
          )}
        >
          <BasicMedia
            data={image}
            wrapperCssClass={cn({
              "saturate-[0.2]": index === 1,
              [sizes[index]]: true
            })}
          />
        </motion.div>
      ))}
    </>
  );
}
