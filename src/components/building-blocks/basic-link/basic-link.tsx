import { TypeComponentBasicLink } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import Link from "next/link";

interface BasicLinkProps {
  data: TypeComponentBasicLink;
  className?: string;
}

export default function BasicLink({ data, className }: BasicLinkProps) {
  const isExternal = data.linkIsExternal;

  return (
    <Link
      href={data.linkUrl || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(className)}
    >
      {data.linkText}
    </Link>
  );
}
