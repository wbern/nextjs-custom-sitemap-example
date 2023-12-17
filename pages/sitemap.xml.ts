import { GetServerSideProps } from "next";

import { SitemapXMLPage } from "../components/SitemapXMLPage/SitemapXMLPage";
import {
  fetchSitemapData,
  buildSitemapXml,
} from "../components/SitemapXMLPage/SitemapXMLPage.utils";

// visit /sitemap.xml to see the generated result below

export const getServerSideProps: GetServerSideProps = async ({
  draftMode,
  res,
}) => {
  const transformedData = await fetchSitemapData();
  const sitemapContent = buildSitemapXml(transformedData, "url");

  // the sitemap.xml should be cached in the browser for 5 minutes to avoid overloading external sources
  if (draftMode) {
    res.setHeader("Cache-Control", "no-store");
  } else {
    res.setHeader("Cache-Control", `max-age=${60 * 5}, stale-while-revalidate`);
  }

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemapContent);

  res.end();

  return {
    props: {},
  };
};

export default SitemapXMLPage;
