import { TypeComponentMedia } from "@/lib/types";

export interface TypePageSeo {
  pageSeoTitle: string;
  pageSeoDescription: string;
  pageSeoOgImage?: TypeComponentMedia;
  pageSeoCanonicalUrl?: string;
  pageSeoNoIndex?: boolean;
}
