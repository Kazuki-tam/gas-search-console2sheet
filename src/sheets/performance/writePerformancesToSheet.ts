import { createSheet } from "../createSheet";

function writePerformancesToSheet(data: (string | number)[][]): void {
	const { sheet, isCreated } = createSheet("検索パフォーマンス");

	// 既にシートが存在していた場合はシートの内容をクリア
	if (isCreated) {
		sheet.clear();
	}

	// ヘッダー行を設定
	const headers = [
		["クエリ", "ページ", "クリック数", "表示回数", "掲載順位", "CTR"],
	];
	const headerRange = sheet.getRange(1, 1, 1, headers[0].length);
	headerRange.setValues(headers);

	// ヘッダー行の列幅を200に設定し、背景色を紺色に設定
	for (let i = 1; i <= headers[0].length; i++) {
		sheet.setColumnWidth(i, 200);
	}
	headerRange.setBackground("#191970").setFontColor("#FFFFFF");

	// CTR列のフォーマットを%表示に設定
	sheet.getRange(2, 6, sheet.getMaxRows() - 1).setNumberFormat("0.00%");

	if (sheet) {
		// データを書き込む開始行はヘッダーの次の行から
		const startRow = sheet.getLastRow() + 1;
		// データを書き込む範囲を決定
		const range = sheet.getRange(startRow, 1, data.length, data[0].length);
		// データを範囲に書き込む
		range.setValues(data);
	} else {
		throw new Error("Failed to create a sheet.");
	}
}

export { writePerformancesToSheet };
