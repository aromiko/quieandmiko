"use client";

import { cn } from "@/lib/utils/classnames";
import { motion } from "framer-motion";

type StaggerChildrenProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
};

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay
    }
  })
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
  }
};

export default function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  amount = 0.15
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
