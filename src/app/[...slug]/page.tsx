import Page from "@/components/page-templates/page/page";
import { buildMetadata } from "@/lib/utils/seo";

export const revalidate = 3600; // 1 hour — content rarely changes

export async function generateStaticParams() {
  // Pre-render known Contentful-backed pages at build time
  return [];
}

interface DynamicPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: DynamicPageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  return buildMetadata(fullSlug);
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  return <Page slug={fullSlug} />;
}
