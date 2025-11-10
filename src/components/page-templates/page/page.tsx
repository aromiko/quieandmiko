import SectionRenderer from "@/components/component-blocks/adaptive-renderers/section-renderer/section-renderer";
import { ComponentSections } from "@/lib/configurations/component-sections";
import { TypePageContentItem } from "@/lib/types";
import { cn } from "@/lib/utils/classnames";
import { filterComponentsForAssembly } from "@/lib/utils/component-filter";
import { ContentsFacade } from "@/queries/content-facade";
import { notFound } from "next/navigation";

interface PageProps {
  slug: string;
  injectedComponent?: React.ReactNode;
  mainClassName?: string;
}

export default async function Page({
  slug,
  injectedComponent,
  mainClassName
}: PageProps) {
  // This facade method should now return page data with all component fields populated
  const page = await ContentsFacade.getPageBySlug(slug);

  if (!page || slug === "404") {
    return notFound();
  }

  // The items in page.pageContentsCollection.items now contain full data
  const allComponents = page.pageContentsCollection
    ?.items as TypePageContentItem[];

  const headerComponents = filterComponentsForAssembly(
    allComponents,
    ComponentSections.Header
  );

  const mainComponents = filterComponentsForAssembly(
    allComponents,
    ComponentSections.Main
  );

  const footerComponents = filterComponentsForAssembly(
    allComponents,
    ComponentSections.Footer
  );

  return (
    <>
      <SectionRenderer
        components={headerComponents}
        sectionAs="header"
        className="sticky top-0 z-50"
      />
      <main className={cn(mainClassName)}>
        {injectedComponent}
        <SectionRenderer
          components={mainComponents}
          sectionAs="div"
          className="w-full"
        />
      </main>
      <SectionRenderer components={footerComponents} sectionAs="footer" />
    </>
  );
}
