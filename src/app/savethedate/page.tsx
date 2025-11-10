import SaveTheDateClient from "@/app/savethedate/savethedate-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://quieandmiko.com"),
  title: "Save the Date | Quie & Miko",
  description:
    "Join us as we celebrate Quie and Miko. Save the date and view the details here.",
  alternates: {
    canonical: "/savethedate"
  },
  openGraph: {
    type: "website",
    url: "/savethedate",
    siteName: "Quie & Miko Wedding",
    title: "Save the Date | Quie & Miko",
    description: "Save the date and view the details for Quie and Miko.",
    images: [
      {
        url: "/images/std/og.png",
        width: 1200,
        height: 630,
        alt: "Quie & Miko Save the Date"
      }
    ],
    locale: "en_PH"
  },
  twitter: {
    card: "summary_large_image",
    title: "Save the Date | Quie & Miko",
    description: "Save the date and view the details for Quie and Miko.",
    images: ["/images/std/og.png"],
    creator: "@yourhandle"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function SaveTheDate() {
  return <SaveTheDateClient />;
}
