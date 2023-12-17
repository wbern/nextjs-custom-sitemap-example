import { PartialSitemapElement } from "./SitemapXMLPage.types";

export const withXMLTemplate = (
  content: string,
  wrappingKey: "urlset" | "sitemapindex"
): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <${wrappingKey}
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
      ${content}</${wrappingKey}
    >`;
};

export const buildSitemapXml = (
  fields: PartialSitemapElement[],
  elementKey: "url" | "sitemap"
): string => {
  const content = fields
    .map((fieldData: PartialSitemapElement) => {
      // Generate tags for other fields
      const field = Object.entries(fieldData)
        .map(([key, value]) => {
          if (!value) return "";
          return `<${key}>${value}</${key}>`;
        })
        .join("");

      return `<${elementKey}>${field}</${elementKey}>\n`;
    })
    .join("");

  if (elementKey === "sitemap") {
    return withXMLTemplate(content, "sitemapindex");
  }
  return withXMLTemplate(content, "urlset");
};

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
