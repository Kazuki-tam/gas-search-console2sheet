/**
 * インデックス状況を記録します。
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @param {number} startRow - 開始行
 * @param {Object} statuses - インデックス状況
 */
function recordStatuses(
	sheet: GoogleAppsScript.Spreadsheet.Sheet,
	startRow: number,
	statuses: {
		inspectionResultLinks: string[][];
		indexStatuses: string[][];
		coverageStatuses: string[][];
		referringUrls: string[][];
	},
) {
	const {
		inspectionResultLinks,
		indexStatuses,
		coverageStatuses,
		referringUrls,
	} = statuses;
	if (inspectionResultLinks.length > 0) {
		sheet
			.getRange(startRow, 2, inspectionResultLinks.length)
			.setValues(inspectionResultLinks);
		sheet.getRange(startRow, 3, indexStatuses.length).setValues(indexStatuses);
		sheet
			.getRange(startRow, 4, coverageStatuses.length)
			.setValues(coverageStatuses);
		sheet.getRange(startRow, 5, referringUrls.length).setValues(referringUrls);
	}
}

export { recordStatuses };
