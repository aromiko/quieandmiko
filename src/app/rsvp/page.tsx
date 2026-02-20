import RsvpCodeForm from "@/components/component-blocks/rsvp/rsvp-code-form";
import Page from "@/components/page-templates/page/page";
import { InjectionRegistry } from "@/lib/configurations/injection-registry";
import { buildMetadata } from "@/lib/utils/seo";

export const revalidate = 3600; // 1 hour — content rarely changes

export async function generateMetadata() {
  return buildMetadata("rsvp");
}

export default function RsvpEntryPage() {
  return (
    <Page
      slug="rsvp"
      injections={{ [InjectionRegistry.RsvpCodeForm]: <RsvpCodeForm /> }}
    />
  );
}
