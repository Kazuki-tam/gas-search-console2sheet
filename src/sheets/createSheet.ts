/**
 * 指定された名前のシートを取得または作成する
 * @param {string} sheetName - シート名
 * @returns {returnValues} sheet, isCreated
 */

type returnValues = {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  isCreated: boolean;
};

function createSheet(sheetName: string): returnValues {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  let isCreated = true;
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    isCreated = false;
  }
  return { sheet, isCreated };
}

export { createSheet };
