import Page from "@/components/page-templates/page/page";
import RsvpCodeForm from "@/components/component-blocks/rsvp/rsvp-code-form";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata() {
  return buildMetadata("rsvp");
}

export default function RsvpEntryPage() {
  return <Page slug="rsvp" injectedComponent={<RsvpCodeForm />} />;
}
