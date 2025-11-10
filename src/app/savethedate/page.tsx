"use client";

import { useIsMobile } from "@/lib/hooks/useIsMobile";
import Image from "next/image";
import Link from "next/link";

export default function SaveTheDate() {
  const isMobile = useIsMobile();

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 my-6 flex w-full items-center justify-center">
        <Link
          href={"/"}
          className="transition-opacity duration-300 ease-in-out hover:opacity-50"
        >
          <Image
            src="/images/monogram-wine.png"
            alt="QM Monogram"
            width={isMobile ? 75 : 150}
            height={isMobile ? 75 : 150}
          />
        </Link>
      </div>
      <iframe
        src="/std/index.html"
        style={{ border: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
