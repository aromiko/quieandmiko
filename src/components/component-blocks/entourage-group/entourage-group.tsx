import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { TypeComponentEntourageGroup } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

type EntourageGroupProps = TypeComponentEntourageGroup & {
  index?: number;
};

const EntourageGroup = ({
  entourageGroupTitle,
  entourageGroupNames,
  entourageGroupClassName,
  index = 0
}: EntourageGroupProps) => {
  return (
    <ScrollReveal
      variant="fade-up"
      delay={index * 0.1}
      amount={0}
      as="article"
      className={cn("flex flex-col", entourageGroupClassName)}
    >
      <h3 className="font-serif text-xl text-white md:h-7 lg:text-2xl">
        {entourageGroupTitle}
      </h3>

      {entourageGroupNames && entourageGroupNames.length > 0 && (
        <ul className="mt-6">
          {entourageGroupNames.map((name, nameIndex) => (
            <li
              key={name + nameIndex}
              className="pl-6 text-lg font-light text-white lg:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </ScrollReveal>
  );
};

export default EntourageGroup;
