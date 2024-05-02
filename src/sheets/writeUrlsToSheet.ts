import { formatDate } from "../utils/formatDate";
import { createSheet } from "./createSheet";

/**
 * URLと関連情報をシートに書き込む
 * @param {string[]} urls - URLのリスト
 */
function writeUrlsToSheet(urls: string[]): void {
  const sheetName = formatDate(new Date());
  const { sheet, isCreated } = createSheet(sheetName);

  // シートが作成済みの場合は処理を終了
  if (isCreated) return;

  // ヘッダー行を含む二次元配列を初期化
  const header: string[][] = [
    [
      "対象ページURL",
      "検査URL",
      "インデックス作成状態",
      "カバレッジ状態",
      "参照元URL",
    ],
  ];

  // URLリストを二次元配列に変換
  const values: string[][] = urls.map((url) => [url, "", "", "", ""]);

  // ヘッダー行とURLリストを結合
  const dataToWrite: string[][] = header.concat(values);

  // サイトマップ情報をバッチ処理でシートに書き込む
  writeDataToSheet(sheet, dataToWrite);

  // 列の幅を設定
  setColumnWidths(sheet, [300, 200, 200, 200, 200]);

  // 文字の折り返しを切り詰めに設定
  sheet
    .getRange(1, 1, dataToWrite.length, dataToWrite[0].length)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
}

/**
 * シートにデータを書き込む
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @param {string[][]} data - 書き込むデータ
 */
function writeDataToSheet(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  data: string[][]
): void {
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);

  // 1行目の背景色をブルー系に設定
  sheet
    .getRange(1, 1, 1, data[0].length)
    .setBackground("#191970")
    .setFontColor("#FFFFFF");
}

/**
 * シートの列幅を設定する
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @param {number[]} widths - 列幅のリスト
 */
function setColumnWidths(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  widths: number[]
): void {
  widths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
}

export { writeUrlsToSheet };
