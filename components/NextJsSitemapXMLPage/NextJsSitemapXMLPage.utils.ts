import { PartialSitemapElement } from "../SitemapXMLPage/SitemapXMLPage.types";

export const fetchSitemapData = async (): Promise<PartialSitemapElement[]> => {
  // replace these hard-coded values with the data you intend to fetch from your CMS (Content Management System)
  const result = [
    {
      slug: "page1",
      _updatedAtValues: ["2021-09-01T00:00:00.000Z"],
    },
    {
      slug: "page2",
      _updatedAtValues: [new Date().toISOString()],
    },
  ];

  return result.map((element) => ({
    loc: `https://kendev.se/tag/${element.slug}`,
    lastmod: element._updatedAtValues.sort().pop() ?? new Date().toISOString(),
    changefreq: "daily",
  }));
};
