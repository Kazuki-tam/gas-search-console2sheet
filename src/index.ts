import { getUrlInspection } from "./search-console/getUrlInspection";
import { getSitemapUrls } from "./sitemap/getSitemapUrls";
import { writeUrlsToSheet } from "./sheets/writeUrlsToSheet";

/**
 * main function
 */
declare const global: {
  [x: string]: () => void;
};

function main() {
  // getUrlInspection("https://yones-kitchen.vercel.app/post-102");
  const urlList = getSitemapUrls(
    "https://yones-kitchen.vercel.app/sitemap-0.xml"
  );
  writeUrlsToSheet(urlList);
}

global.main = main;
