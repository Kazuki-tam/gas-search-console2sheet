import { getPropertiesService } from "../utils/getPropertiesService";
import type { requestOptionsType } from "../types";

/**
 * Google Search Console APIを使用して、指定したURLがインデックスされているかどうかを確認します。
 * https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect?hl=ja
 *
 * @param {string} urlToCheck 検査したいURL
 * @returns {GoogleAppsScript.URL_Fetch.HTTPResponse}
 */
function getUrlInspection(
  urlToCheck: string
): GoogleAppsScript.URL_Fetch.HTTPResponse {
  const requestUrl =
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
  const siteUrl = getPropertiesService("SITE_URL");

  const requestPayload = {
    inspectionUrl: urlToCheck,
    siteUrl: siteUrl,
    languageCode: "ja-JP",
  };

  const requestOptions: requestOptionsType = {
    method: "post",
    payload: requestPayload,
    muteHttpExceptions: true,
    headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
  };

  const response = UrlFetchApp.fetch(requestUrl, requestOptions);
  Logger.log(response);
  return response;
}

export { getUrlInspection };
