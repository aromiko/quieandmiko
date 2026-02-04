import { BasicMediaLink } from "@/components/building-blocks/basic-media/basic-media-link/basic-media-with-link";
import { TypeComponentBasicMedia } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import Image from "next/image";

interface BasicMediaProps {
  data: TypeComponentBasicMedia;
  imageCssClass?: string;
  wrapperCssClass?: string;
  sizes?: string;
  decorative?: boolean;
}

export default function BasicMedia({
  data,
  imageCssClass,
  wrapperCssClass,
  sizes,
  decorative = false
}: BasicMediaProps) {
  const altText = decorative
    ? ""
    : data.basicMediaAltText || data.basicMediaImage.description || "";

  if (data.basicMediaFill) {
    return (
      <BasicMediaLink
        url={data.basicMediaLinkUrl}
        isExternal={data.basicMediaLinkIsExternal}
      >
        <div className={cn("relative", wrapperCssClass)}>
          <Image
            className={imageCssClass}
            src={data.basicMediaImage.url}
            alt={altText}
            aria-hidden={decorative}
            fill={true}
            sizes={sizes || "100vw"}
            loading={data.basicMediaEager ? "eager" : "lazy"}
            priority={data.basicMediaPriority}
          />
        </div>
      </BasicMediaLink>
    );
  }

  return (
    <BasicMediaLink
      url={data.basicMediaLinkUrl}
      isExternal={data.basicMediaLinkIsExternal}
    >
      <div className={wrapperCssClass}>
        <Image
          className={imageCssClass}
          src={data.basicMediaImage.url}
          alt={altText}
          aria-hidden={decorative}
          height={data.basicMediaHeight || data.basicMediaImage.height}
          width={data.basicMediaWidth || data.basicMediaImage.width}
          loading={data.basicMediaEager ? "eager" : "lazy"}
          priority={data.basicMediaPriority}
        />
      </div>
    </BasicMediaLink>
  );
}
