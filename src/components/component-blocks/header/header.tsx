import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { buttonVariants } from "@/components/ui/button";
import { TypeComponentHeader } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import Link from "next/link";

export default function Header({
  headerName,
  headerLogo
}: TypeComponentHeader) {
  return (
    <div className="justify-items-center">
      <div className="container p-4 font-bold">
        {headerLogo && <BasicMedia data={headerLogo} />}

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "link" }),
            "font-playfair-display text-2xl font-bold"
          )}
        >
          {/* {headerName} */}
          Q&M
        </Link>
      </div>
    </div>
  );
}
