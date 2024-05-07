import { getSearchPerformanceData } from "./search-console/getSearchPerformanceData";
import { writePerformancesToSheet } from "./sheets/performance/writePerformancesToSheet";
import { getPropertiesService } from "./utils/getPropertiesService";
import { formatDate } from "./utils/formatDate";

/**
 * performance function
 */
declare const global: {
  [x: string]: () => void;
};

function performance() {
  const siteURL = getPropertiesService("SITE_URL");
  if (!siteURL) {
    throw new Error("SITE_URL is not set in PropertiesService.");
  }

  // 日付の設定
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const thirtyDaysAgoDate = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
  );
  const formattedYesterday = formatDate(yesterday);
  const formattedThirtyDaysAgoDate = formatDate(thirtyDaysAgoDate);

  const startDate =
    getPropertiesService("START_DATE") || formattedThirtyDaysAgoDate;
  const endDate = getPropertiesService("END_DATE") || formattedYesterday;

  console.log("startDate: ", startDate);
  console.log("endDate: ", endDate);

  // パフォーマンスデータの取得
  const data = getSearchPerformanceData(startDate, endDate, siteURL);
  if (!data) {
    throw new Error("No data found.");
  }
  writePerformancesToSheet(data);
}

global.performance = performance;
