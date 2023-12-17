import { GetServerSideProps } from "next";

import { SitemapXMLPage } from "../components/SitemapXMLPage/SitemapXMLPage";
import {
  fetchSitemapData,
  buildSitemapXml,
  sendResponse,
} from "../components/SitemapXMLPage/SitemapXMLPage.utils";

// visit /sitemap.xml to see the generated result below

export const getServerSideProps: GetServerSideProps = async ({
  draftMode,
  res,
}) => {
  const data = await fetchSitemapData();
  // note that we're passing "sitemap" here to generate links to other sitemaps
  const sitemapContent = buildSitemapXml(data, "sitemap");

  sendResponse(res, sitemapContent, draftMode);

  return {
    props: {},
  };
};

export default SitemapXMLPage;
