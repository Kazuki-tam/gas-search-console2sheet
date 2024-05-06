import type { requestOptionsType } from "../types";
import { getPropertiesService } from "../utils/getPropertiesService";

interface DimensionFilter {
  dimension: string;
  operator: string;
  expression: string;
}

interface DimensionFilterGroup {
  groupType: string;
  filters: DimensionFilter[];
}

/**
 * Google Search Console APIから指定したURLの検索パフォーマンスデータを取得します。
 * @param dimensionFilterGroups - データ取得のフィルタリング条件
 * @returns 検索パフォーマンスデータ
 */
function getSearchPerformanceData(
  startDate: string,
  endDate: string,
  siteURL: string,
  dimensionFilterGroups?: DimensionFilterGroup[]
): (string | number)[][] | null {
  // siteURLを https%3A%2F%2Fyones-kitchen.vercel.app%2F にエンコードする
  const searchUrl: string = encodeURIComponent(siteURL);

  const requestUrl: string =
    "https://www.googleapis.com/webmasters/v3/sites/" +
    searchUrl +
    "/searchAnalytics/query";

  const requestPayload: any = {
    startDate,
    endDate,
    dimensions: ["page", "query"],
    rowLimit: 20000,
  };

  // dimensionFilterGroupsが指定されていれば、リクエストペイロードに追加する
  if (dimensionFilterGroups && dimensionFilterGroups.length > 0) {
    requestPayload.dimensionFilterGroups = dimensionFilterGroups;
  }

  const requestOptions: requestOptionsType = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
    payload: JSON.stringify(requestPayload),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(requestUrl, requestOptions);
    const jsonResponse = JSON.parse(response.getContentText());
    const rows = jsonResponse.rows || [];
    const data: (string | number)[][] = rows.map((row: any) => [
      row.keys[1], // query
      row.keys[0], // page
      row.clicks,
      row.impressions,
      parseFloat(row.position.toFixed(2)),
      parseFloat(row.ctr.toFixed(2)),
    ]);
    return data;
  } catch (error) {
    Logger.log(`Error fetching search performance data: ${error}`);
    return null;
  }
}

export { getSearchPerformanceData };
