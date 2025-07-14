import RsvpCodeForm from "@/components/component-blocks/rsvp/rsvp-code-form";
import Page from "@/components/page-templates/page/page";

export default function RsvpEntryPage() {
  return <Page slug="rsvp" injectedComponent={<RsvpCodeForm />} />;
}
