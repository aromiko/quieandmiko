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
      type: "website",
      url: pageSeoCanonicalUrl || DefaultSeoContents.seoOgUrl,
      images: [
        {
          url: "https://www.quieandmiko.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Quie & Miko Wedding"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeoTitle || DefaultSeoContents.seoDefaultTitle,
      description:
        pageSeoDescription || DefaultSeoContents.seoDefaultDescription,
      images: [
        {
          url: "https://www.quieandmiko.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Quie & Miko Wedding"
        }
      ]
    },
    robots: pageSeoNoIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: pageSeoCanonicalUrl || DefaultSeoContents.seoOgUrl
    }
  };
}
