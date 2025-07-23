import Page from "@/components/page-templates/page/page";
import { buildMetadata } from "@/lib/utils/seo";

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
