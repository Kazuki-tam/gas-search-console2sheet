/**
 * シートが空かどうかを判定します。
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @returns {boolean} - シートが空の場合はtrue、それ以外はfalse
 */
function isSheetEmpty(sheet: GoogleAppsScript.Spreadsheet.Sheet): boolean {
  return (
    sheet.getRange("B2").getValue() === "" &&
    sheet.getRange("C2").getValue() === ""
  );
}

export { isSheetEmpty };
