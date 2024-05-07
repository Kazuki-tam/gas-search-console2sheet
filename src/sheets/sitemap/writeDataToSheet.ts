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

export { writeDataToSheet };
