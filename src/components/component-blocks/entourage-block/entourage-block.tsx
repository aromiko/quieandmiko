import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import { TypeComponentEntourageBlock } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";

import EntourageGroup from "../entourage-group/entourage-group";

const EntourageBlock = ({
  entourageBlockTitle,
  entourageBlockBackgroundImage,
  entourageBlockImage,
  entourageBlockGroupsCollection
}: TypeComponentEntourageBlock) => {
  console.log(entourageBlockGroupsCollection?.items[0].entourageGroupNames);
  return (
    <section className="container relative mx-auto flex flex-col items-center justify-center px-8 py-16 lg:px-32">
      {entourageBlockTitle && (
        <h2 className="z-20 text-7xl lg:text-8xl">{entourageBlockTitle}</h2>
      )}

      {entourageBlockImage && (
        <BasicMedia
          data={entourageBlockImage}
          wrapperCssClass="aspect-[0.81/1] w-[100px] lg:w-[141px] absolute right-2 lg:right-24 top-32 z-10"
          imageCssClass="object-cover object-left lg:object-center"
        />
      )}

      <div
        style={{
          backgroundImage: `url(${entourageBlockBackgroundImage?.basicMediaImage.url})`
        }}
        className="relative mx-8 my-16 flex w-full flex-wrap overflow-hidden bg-contain px-8 py-20 lg:mx-32 lg:px-20"
      >
        <div
          className="h-300 bg-size-[auto_1000px] pointer-events-none absolute left-0 z-0 w-full bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='117' height='69' viewBox='0 0 117 69' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M58.4845 20.9797C55.8326 24.0432 52.3356 27.3109 50.1687 30.7122C42.3016 43.0591 61.1257 42.7522 68.3277 41.4402C74.3743 36.3013 84.1748 30.4631 88.1717 23.4882C89.6448 20.9177 90.4335 18.484 86.8906 17.3698C81.7958 15.7681 70.6214 19.193 65.8176 21.5988C63.5643 22.7269 61.585 24.2837 59.4288 25.5615C59.0067 24.9927 60.7089 23.4497 61.1299 23.099C66.4965 18.6305 83.887 12.8393 89.9059 17.1261C94.8866 20.6739 89.8963 27.0606 87.1421 30.3679C84.1396 33.9724 80.5338 36.9193 77.1252 40.1025C81.7041 39.4364 86.2639 38.4698 90.7756 37.4336C98.1524 35.7399 105.443 33.3725 112.775 31.6949C114.134 31.3837 115.608 31.0426 117 31.0127C115.479 31.8478 113.602 32.4348 111.928 32.9823C99.6723 36.9877 87.075 39.9496 74.3647 42.1459C67.5357 48.1745 58.9481 53.6352 53.5815 61.0816C52.0488 63.2084 49.3586 66.6675 53.4035 67.6394C57.7672 68.6884 67.4771 66.0537 72.0539 64.8519C73.7966 64.3942 75.6149 63.7109 77.3277 63.2961C77.542 63.2437 78.0259 63.0159 77.9768 63.4126C72.5825 65.2454 66.9516 67.1315 61.3484 68.2297C55.3967 69.3963 45.8797 70.5393 49.1305 61.1083C51.6374 53.8352 60.5384 48.0087 66.0361 43.0986C61.3079 43.4087 55.8049 43.7423 51.3262 41.916C38.2034 36.5654 55.4361 22.4478 59.8456 16.8897C62.6243 13.3868 67.3247 7.04497 61.276 4.13121C55.1452 1.17896 39.5933 5.24753 33.034 7.32085C21.5057 10.9681 10.4219 16.8063 2.06343 25.662C-1.5285 26.2288 0.42734 22.8841 1.55182 21.3016C10.8194 8.2586 41.8806 -1.14563 57.1852 0.112896C59.2327 0.280772 62.3823 1.20355 64.012 2.46208C71.2385 8.04047 62.4324 16.4193 58.4855 20.9797H58.4845Z' fill='black'/%3E%3C/svg%3E")`
          }}
        />

        {entourageBlockGroupsCollection?.items &&
          entourageBlockGroupsCollection?.items.length > 0 &&
          entourageBlockGroupsCollection?.items.map((entourageGroup, index) => (
            <EntourageGroup
              key={index}
              {...entourageGroup}
              entourageGroupClassName={cn("w-full md:w-1/2", {
                "mt-16": entourageGroup.entourageGroupTitle && index > 0,
                "md:mt-0": index < 2,
                "md:mt-10": index > 1
              })}
            />
          ))}
      </div>
    </section>
  );
};

export default EntourageBlock;
