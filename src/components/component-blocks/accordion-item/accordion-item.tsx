import BasicMedia from "@/components/building-blocks/basic-media/basic-media";
import {
  AccordionContent,
  AccordionItem as AccordionItemUI,
  AccordionTrigger
} from "@/components/ui/accordion";
import { TypeComponentAccordionItem } from "@/lib/types";

const AccordionItem = ({
  accordionItemTitle,
  accordionItemBody,
  accordionItemImage1,
  sys
}: TypeComponentAccordionItem) => {
  return (
    <AccordionItemUI value={sys.id} className="relative">
      <AccordionTrigger>{accordionItemTitle}</AccordionTrigger>
      <AccordionContent>
        {accordionItemBody && (
          <p className="text-coffee/70 max-w-2xl text-base font-light leading-[1.8] lg:text-lg">
            {accordionItemBody}
          </p>
        )}
        {accordionItemImage1 && (
          <BasicMedia
            data={accordionItemImage1}
            wrapperCssClass="mt-5 w-full max-w-md aspect-[3/2] overflow-hidden rounded"
            imageCssClass="object-cover"
            sizes="(min-width: 1024px) 450px, 100vw"
          />
        )}
      </AccordionContent>
    </AccordionItemUI>
  );
};

export default AccordionItem;
