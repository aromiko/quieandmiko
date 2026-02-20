import ScrollReveal from "@/components/component-blocks/animation-wrapper/scroll-reveal";
import { Accordion } from "@/components/ui/accordion";
import { TypeComponentAccordionBlock } from "@/lib/types";

import AccordionItem from "../accordion-item/accordion-item";

const AccordionBlock = ({
  accordionBlockTitle,
  accordionBlockBody,
  accordionBlockItemsCollection
}: TypeComponentAccordionBlock) => {
  return (
    <section className="bg-cream flex flex-col items-center px-8 py-32 lg:px-12">
      {accordionBlockTitle && (
        <ScrollReveal variant="fade-up">
          <h2 className="text-coffee mb-16 text-7xl lg:mb-20 lg:text-8xl">
            {accordionBlockTitle}
          </h2>
        </ScrollReveal>
      )}

      {accordionBlockBody && (
        <ScrollReveal variant="fade" delay={0.15}>
          <p className="text-coffee/80 mb-20 max-w-2xl text-center font-serif text-xl leading-relaxed tracking-wide lg:text-2xl">
            {accordionBlockBody}
          </p>
        </ScrollReveal>
      )}

      {accordionBlockItemsCollection?.items &&
        accordionBlockItemsCollection.items.length > 0 && (
          <ScrollReveal
            variant="fade-up"
            delay={0.2}
            className="w-full max-w-3xl"
          >
            {/* Top decorative divider */}
            <div className="via-sugar/60 mb-2 h-px bg-gradient-to-r from-transparent to-transparent" />
            <Accordion type="single" collapsible className="w-full">
              {accordionBlockItemsCollection.items.map((item) => (
                <AccordionItem key={item.sys.id} {...item} />
              ))}
            </Accordion>
          </ScrollReveal>
        )}
    </section>
  );
};

export default AccordionBlock;
