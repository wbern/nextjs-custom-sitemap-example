import { NextResponse } from "next/server";
import { PartialSitemapElement } from "./SitemapXMLPage.types";
import { ServerResponse, IncomingMessage } from "http";

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

export const fetchSitemapData = (): PartialSitemapElement[] => [
  {
    // links to our second sitemap in the next.js project
    loc: `https://kendev.se/sitemap/nextjs_sitemap.xml`,
    priority: 0.9,
    changefreq: "always",
  },
  {
    // links to an old sitemap from our previous CMS
    // which pages are still being served
    loc: `https://kendev.se/sitemap/old_cms_sitemap.xml`,
    priority: 0.6,
    changefreq: "weekly",
  },
];

export const sendResponse = (
  res: ServerResponse<IncomingMessage>,
  content: string,
  draftMode?: boolean
) => {
  if (draftMode) {
    res.setHeader("Cache-Control", "no-store");
  } else {
    res.setHeader("Cache-Control", `max-age=${60 * 5}, stale-while-revalidate`);
  }

  res.setHeader("Content-Type", "application/xml");
  res.write(content);

  res.end();
};
