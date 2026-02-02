import { TypeComponentEntourageGroup } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

const EntourageGroup = ({
  entourageGroupTitle,
  entourageGroupNames,
  entourageGroupClassName
}: TypeComponentEntourageGroup) => {
  return (
    <article className={cn("flex flex-col", entourageGroupClassName)}>
      <h3 className="font-serif text-xl text-white lg:h-7">
        {entourageGroupTitle}
      </h3>

      {entourageGroupNames && entourageGroupNames.length > 0 && (
        <ul className="mt-6">
          {entourageGroupNames.map((name, index) => (
            <li key={index} className="pl-6 font-light text-white">
              {name}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default EntourageGroup;
