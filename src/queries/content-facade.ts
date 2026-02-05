import { ContentfulDataService } from "@/lib/services/contentful-data-service";
import QUERY_PAGE_BY_SLUG from "@/queries/page-templates/page.gql";
import { print as graphQLPrint } from "graphql";
import { cache } from "react";

// Cache the page fetch to prevent duplicate API calls during SSR
// (e.g., when generateMetadata and Page component both call getPageBySlug)
const fetchPageBySlug = cache(async (slug: string) => {
  const data = await ContentfulDataService.fetchDataBySlug(
    QUERY_PAGE_BY_SLUG,
    slug
  );
  return data?.componentPageCollection?.items?.[0] ?? null;
});

export const ContentsFacade = {
  async getPageBySlug(slug: string) {
    try {
      return await fetchPageBySlug(slug);
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));

      console.error("[ContentsFacade Error]", {
        slug,
        query: graphQLPrint(QUERY_PAGE_BY_SLUG),
        message: err.message,
        stack: err.stack
      });

      throw new Error(
        `[ContentsFacade]: Failed to fetch page by slug "${slug}"\n${err.message}`
      );
    }
  }
};
