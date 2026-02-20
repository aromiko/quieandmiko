import Page from "@/components/page-templates/page/page";
import { buildMetadata } from "@/lib/utils/seo";

export const revalidate = 3600; // 1 hour — content rarely changes

export async function generateMetadata() {
  return buildMetadata("home");
}

export default function Home() {
  return (
    <Page
      slug="home"
      mainClassName="min-h-screen flex items-center justify-center"
    />
  );
}
