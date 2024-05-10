import { getPropertiesService } from "../../utils/getPropertiesService";
import { DEFAULT_START_ROW } from "../constants";

/**
 * 処理対象の行の範囲を計算します。
 * @param {GoogleAppsScript.Properties.Properties} scriptProperties - スクリプトプロパティ
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 * @returns {{startRow: number;endRow: number;}} - 開始行と終了行
 */
function calculateRowRange(
	scriptProperties: GoogleAppsScript.Properties.Properties,
	sheet: GoogleAppsScript.Spreadsheet.Sheet,
): { startRow: number; endRow: number } {
	const lastProcessedRow =
		Number(scriptProperties.getProperty("lastProcessedRow")) ||
		DEFAULT_START_ROW;
	const numRows = Number(getPropertiesService("MAX_ROWS")) || 100;
	const lastRow = sheet.getLastRow();
	const endRow = Math.min(lastProcessedRow + numRows - 1, lastRow);
	return { startRow: lastProcessedRow, endRow };
}

export { calculateRowRange };
