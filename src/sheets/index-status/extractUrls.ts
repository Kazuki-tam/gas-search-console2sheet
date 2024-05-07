/**
 * シートからURLリストを抽出します。
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @param {number} startRow - 開始行
 * @param {number} endRow - 終了行
 * @returns {string[][]} - URLリスト
 */
function extractUrls(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  startRow: number,
  endRow: number
): string[][] {
  return sheet
    .getRange(`A${startRow}:A${endRow}`)
    .getValues()
    .filter((row) => row[0] !== "");
}

export { extractUrls };
