import { getSitemapUrls } from "./sitemap/getSitemapUrls";
import { writeUrlsToSheet } from "./sheets/write-sitemap/";
import { writeIndexStatus } from "./sheets/write-index-status";
import { getPropertiesService } from "./utils/getPropertiesService";

/**
 * main function
 */
declare const global: {
  [x: string]: () => void;
};

function main() {
  // サイトマップのURLを取得
  const siteMapUrl = getPropertiesService("SITEMAP_URL");
  if (!siteMapUrl) {
    throw new Error("SITEMAP_URL is not set in PropertiesService.");
  }
  // サイトマップのURLからURLリストを取得
  const urlList = getSitemapUrls(siteMapUrl);
  // URLリストをシートに書き込む
  writeUrlsToSheet(urlList);
  // インデックスステータスをシートに書き込む
  writeIndexStatus();
}

global.main = main;
