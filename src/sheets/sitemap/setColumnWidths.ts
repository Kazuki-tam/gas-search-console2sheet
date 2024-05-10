/**
 * シートの列幅を設定する
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @param {number[]} widths - 列幅のリスト
 */
function setColumnWidths(
	sheet: GoogleAppsScript.Spreadsheet.Sheet,
	widths: number[],
): void {
	widths.forEach((width, index) => {
		sheet.setColumnWidth(index + 1, width);
	});
}

export { setColumnWidths };
