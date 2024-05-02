import { getSitemapUrls } from "./sitemap/getSitemapUrls";
import { writeUrlsToSheet } from "./sheets/writeUrlsToSheet";
import { writeIndexStatus } from "./sheets/writeIndexStatus";
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
  // サイトマップのURLからURLリストを取得
  const urlList = getSitemapUrls(siteMapUrl);
  // URLリストをシートに書き込む
  writeUrlsToSheet(urlList);
  // インデックスステータスをシートに書き込む
  writeIndexStatus();
}

global.main = main;
