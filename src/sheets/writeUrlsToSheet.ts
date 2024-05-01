import { formatDate } from "../utils/formatDate";
import { createSheet } from "./createSheet";

/**
 * URLをシートに書き込む
 * @param {string[]} urls - URLのリスト
 */
function writeUrlsToSheet(urls: string[]) {
  const implementationDate = new Date();
  const sheetName = formatDate(implementationDate);
  const sheet = createSheet(sheetName);

  // URLを行毎に書き込むための値の配列を作成
  const values = urls.map((url) => [url]);

  // バッチ処理でURLを書き込む
  sheet.getRange(1, 1, values.length).setValues(values);
}

export { writeUrlsToSheet };
