import { BasicMediaLink } from "@/components/building-blocks/basic-media/basic-media-link/basic-media-with-link";
import Image from "next/image";
import { TypeComponentBasicMedia } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

interface BasicMediaProps {
  data: TypeComponentBasicMedia;
  imageCssClass?: string;
  wrapperCssClass?: string;
}

export default function BasicMedia({
  data,
  imageCssClass,
  wrapperCssClass
}: BasicMediaProps) {
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
            alt={
              data.basicMediaAltText ||
              data.basicMediaImage.description ||
              "Basic media image"
            }
            fill={true}
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
          alt={
            data.basicMediaAltText ||
            data.basicMediaImage.description ||
            "Basic media image"
          }
          height={data.basicMediaHeight || data.basicMediaImage.height}
          width={data.basicMediaWidth || data.basicMediaImage.width}
          loading={data.basicMediaEager ? "eager" : "lazy"}
          priority={data.basicMediaPriority}
        />
      </div>
    </BasicMediaLink>
  );
}
