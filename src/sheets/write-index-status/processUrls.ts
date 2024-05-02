import { getUrlInspection } from "../../search-console/getUrlInspection";

/**
 * URLリストを処理して、インデックス状況を取得します。
 * @param {string[][]} urls - URLリスト
 * @returns {Object} - インデックス状況
 */
function processUrls(urls: string[][]): {
  indexStatuses: string[][];
  coverageStatuses: string[][];
  inspectionResultLinks: string[][];
  referringUrls: string[][];
} {
  const indexStatuses: string[][] = [];
  const coverageStatuses: string[][] = [];
  const inspectionResultLinks: string[][] = [];
  const referringUrls: string[][] = [];

  urls.forEach((url) => {
    const response = getUrlInspection(url[0]);
    const responseBody = JSON.parse(response.getContentText());
    const inspectionResultLinkItem =
      responseBody.inspectionResult?.inspectionResultLink || "-";
    const verdict =
      responseBody.inspectionResult?.indexStatusResult?.verdict || "-";
    const coverageStatus =
      responseBody.inspectionResult?.indexStatusResult?.coverageState || "-";
    const referringUrlsList =
      responseBody.inspectionResult?.indexStatusResult?.referringUrls || [];
    const referringUrlsItem =
      referringUrlsList.map((item: string) => item).join(", ") || "-";

    indexStatuses.push([verdict]);
    coverageStatuses.push([coverageStatus]);
    inspectionResultLinks.push([inspectionResultLinkItem]);
    referringUrls.push([referringUrlsItem]);
  });

  return {
    indexStatuses,
    coverageStatuses,
    inspectionResultLinks,
    referringUrls,
  };
}

export { processUrls };
