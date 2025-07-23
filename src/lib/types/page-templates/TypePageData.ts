import { TypePageContentItem, TypePageSeo } from "@/lib/types";

export interface TypePageData {
  componentPageCollection?: {
    items: {
      pageName: string;
      pageSlug?: string;
      pageSeo?: TypePageSeo;
      pageContentsCollection?: {
        // Make inner collections optional too
        items: (TypePageContentItem | null)[]; // Items can be null if there's a resolution issue
      } | null;
    }[];
  } | null;
}
