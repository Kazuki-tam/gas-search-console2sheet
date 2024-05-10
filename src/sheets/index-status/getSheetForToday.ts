/**
 * 今日の日付のシートを取得します。
 * @param {string} today - 今日の日付
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} - シート
 * @throws {Error} - シートが見つからない場合
 */
function getSheetForToday(today: string): GoogleAppsScript.Spreadsheet.Sheet {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(today);
	if (!sheet) {
		throw new Error("シートが見つかりませんでした。");
	}
	return sheet;
}

export { getSheetForToday };
