import { GetServerSideProps } from "next";
import { fetchSitemapData } from "../../components/NextJsSitemapXMLPage/NextJsSitemapXMLPage.utils";
import {
  buildSitemapXml,
  sendResponse,
} from "../../components/SitemapXMLPage/SitemapXMLPage.utils";
import { SitemapXMLPage } from "../../components/SitemapXMLPage/SitemapXMLPage";

// visit /sitemap/nextjs_sitemap.xml to see the generated result below

export const getServerSideProps: GetServerSideProps = async ({
  draftMode,
  res,
}) => {
  const data = await fetchSitemapData();
  const sitemapContent = buildSitemapXml(data, "url");

  sendResponse(res, sitemapContent, draftMode);

  return {
    props: {},
  };
};

export default SitemapXMLPage;
