import { DefaultSeoContents } from "@/lib/defaults/default-seo-contents";
import { ContentsFacade } from "@/queries/content-facade";

export async function buildMetadata(slug: string) {
  const page = await ContentsFacade.getPageBySlug(slug);
  const seo = page?.pageSeo;

  if (!seo || !page) {
    return {
      title: DefaultSeoContents.seoDefaultTitle,
      description: DefaultSeoContents.seoDefaultDescription
    };
  }

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
      title: pageSeoTitle || DefaultSeoContents.seoDefaultTitle,
      description:
        pageSeoDescription || DefaultSeoContents.seoDefaultDescription,
      images: pageSeoOgImage?.url ? [{ url: pageSeoOgImage.url }] : undefined,
      type: "website",
      url: pageSeoCanonicalUrl || DefaultSeoContents.seoOgUrl
    },
    robots: pageSeoNoIndex ? "noindex, nofollow" : "index, follow",
    alternates: pageSeoCanonicalUrl
      ? { canonical: pageSeoCanonicalUrl }
      : { canonical: DefaultSeoContents.seoOgUrl }
  };
}
