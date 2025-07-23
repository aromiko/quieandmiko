import { ContentsFacade } from "@/queries/content-facade";
import { DefaultSeoContents } from "@/lib/defaults/default-seo-contents";

export async function buildMetadata(slug: string) {
  console.log(slug);
  const page = await ContentsFacade.getPageBySlug(slug);
  const seo = page?.pageSeo;

  if (!seo) {
    return {
      title: DefaultSeoContents.seoDefaultTitle,
      description: DefaultSeoContents.seoDefaultDescription
    };
  }

  console.log(seo);

  const {
    pageSeoTitle,
    pageSeoDescription,
    pageSeoOgImage,
    pageSeoCanonicalUrl,
    pageSeoNoIndex
  } = seo;

  return {
    title: pageSeoTitle || DefaultSeoContents.seoDefaultTitle,
    description: pageSeoDescription || DefaultSeoContents.seoDefaultDescription,
    openGraph: {
      pageSeoTitle,
      pageSeoDescription,
      images: pageSeoOgImage?.url ? [{ url: pageSeoOgImage.url }] : undefined
    },
    robots: pageSeoNoIndex ? "noindex, nofollow" : "index, follow",
    alternates: pageSeoCanonicalUrl
      ? { canonical: pageSeoCanonicalUrl }
      : DefaultSeoContents.seoOgUrl
  };
}
