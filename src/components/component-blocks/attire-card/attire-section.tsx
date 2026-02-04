import { cn } from "@/lib/utils/classnames";

type AttireSectionProps = {
  title?: string;
  body?: string;
  colorsTitle?: string;
  colorsCollection?: {
    items?: { textValue?: string }[];
  };
  className?: string;
};

const AttireSection = ({
  title,
  body,
  colorsTitle,
  colorsCollection,
  className
}: AttireSectionProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {title && (
        <h4 className="mt-4 font-sans text-base text-black md:text-base">
          {title}
        </h4>
      )}

      {body && (
        <p className="text-center font-mono text-xs font-light leading-3 md:text-base md:leading-5">
          {body}
        </p>
      )}

      {colorsTitle && (
        <p className="text-center font-mono text-xs font-light leading-3 md:text-base md:leading-5">
          {colorsTitle}
        </p>
      )}

      {colorsCollection?.items && colorsCollection.items.length > 0 && (
        <div className="mt-4 flex">
          {colorsCollection.items.map((color, index) => (
            <div
              key={color.textValue ?? index}
              className="size-[30px]"
              style={{ backgroundColor: `#${color.textValue}` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttireSection;
