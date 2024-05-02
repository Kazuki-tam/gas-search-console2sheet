import { getUrlInspection } from "../search-console/getUrlInspection";
import { formatDate } from "../utils/formatDate";
import { getPropertiesService } from "../utils/getPropertiesService";

/**
 * 指定したURLのインデックス状況をスプレッドシートに記録します。
 */
function writeIndexStatus() {
  const implementationDate = new Date();
  const sheetName = formatDate(implementationDate);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error("シートが見つかりませんでした。");
  }

  const scriptProperties = PropertiesService.getScriptProperties();
  const lastProcessedDate = scriptProperties.getProperty("lastProcessedDate");
  const today = formatDate(new Date());

  // 実行日が異なる場合、プロパティをリセット
  if (lastProcessedDate !== today) {
    scriptProperties.setProperty("lastProcessedDate", today);
    scriptProperties.setProperty("lastProcessedRow", "2");
  }

  // B, C列に値が入っていない場合、プロパティをリセット
  if (
    sheet.getRange("B2").getValue() === "" &&
    sheet.getRange("C2").getValue() === ""
  ) {
    scriptProperties.setProperty("lastProcessedRow", "2");
  }

  const lastProcessedRow =
    Number(scriptProperties.getProperty("lastProcessedRow")) || 2;
  const startRow = lastProcessedRow;
  const numRows = Number(getPropertiesService("MAX_ROWS")) || 100;
  const lastRow = sheet.getLastRow();
  const endRow = Math.min(startRow + numRows - 1, lastRow);

  const urls = sheet
    .getRange("A" + startRow + ":A" + endRow)
    .getValues()
    .filter((row) => row[0] !== "");
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

  // インデックス状況とカバレッジ状況を記録
  if (
    indexStatuses.length > 0 &&
    coverageStatuses.length > 0 &&
    inspectionResultLinks.length > 0
  ) {
    sheet
      .getRange(startRow, 2, inspectionResultLinks.length)
      .setValues(inspectionResultLinks);
    sheet.getRange(startRow, 3, indexStatuses.length).setValues(indexStatuses);
    sheet
      .getRange(startRow, 4, coverageStatuses.length)
      .setValues(coverageStatuses);
    sheet.getRange(startRow, 5, referringUrls.length).setValues(referringUrls);
  }

  // 処理が完了したかどうかをチェック
  if (endRow >= lastRow) {
    // 全てのURLが処理されたので、プロパティをリセット
    scriptProperties.setProperty("lastProcessedRow", "2");
  } else {
    // まだ処理するURLがあるので、最後に処理した行を保存
    scriptProperties.setProperty("lastProcessedRow", (endRow + 1).toString());
  }
}

export { writeIndexStatus };
