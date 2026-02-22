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
      type: "website",
      url: pageSeoCanonicalUrl || DefaultSeoContents.seoOgUrl,
      images: pageSeoOgImage?.url
        ? [
            {
              url: "https://www.quieandmiko.com/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Quie & Miko Wedding"
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeoTitle || DefaultSeoContents.seoDefaultTitle,
      description:
        pageSeoDescription || DefaultSeoContents.seoDefaultDescription,
      images: pageSeoOgImage?.url ? [pageSeoOgImage.url] : undefined
    },
    robots: pageSeoNoIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: pageSeoCanonicalUrl || DefaultSeoContents.seoOgUrl
    }
  };
}
