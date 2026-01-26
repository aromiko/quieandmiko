import Link from "next/link";

export default function RsvpNotFoundPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4 p-6 text-center">
      <h1>Not Found</h1>
      <p className="text-muted-foreground">
        We couldn’t find a match for that RSVP code.
      </p>
      <p className="text-sm">
        Please double-check the link or enter the code again from the{" "}
        <Link href="/rsvp" className="text-primary underline">
          RSVP page
        </Link>
        .
      </p>
    </div>
  );
}
