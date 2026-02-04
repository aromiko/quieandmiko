import "@/app/assets/styles/globals.css";
import {
  ApercuMono,
  ApercuPro,
  KuenstlerScript,
  ProximaSera
} from "@/app/fonts";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quie & Miko",
  description: "Wedding archive of Quie & Miko"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ApercuPro.variable} ${ApercuMono.variable} ${ProximaSera.variable} ${KuenstlerScript.variable}`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-1/2 focus:top-4 focus:z-[100] focus:-translate-x-1/2 focus:rounded-md focus:bg-white focus:px-6 focus:py-3 focus:text-base focus:font-medium focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
