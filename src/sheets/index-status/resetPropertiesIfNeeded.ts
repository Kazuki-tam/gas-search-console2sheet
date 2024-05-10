import { isSheetEmpty } from "./isSheetEmpty";
import { DEFAULT_START_ROW } from "../constants";

/**
 * スクリプトプロパティをリセットします。
 * @param {GoogleAppsScript.Properties.Properties} scriptProperties - スクリプトプロパティ
 * @param {string} today - 今日の日付
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - シート
 */
function resetPropertiesIfNeeded(
	scriptProperties: GoogleAppsScript.Properties.Properties,
	today: string,
	sheet: GoogleAppsScript.Spreadsheet.Sheet,
) {
	const lastProcessedDate = scriptProperties.getProperty("lastProcessedDate");
	if (lastProcessedDate !== today || isSheetEmpty(sheet)) {
		scriptProperties.setProperty("lastProcessedDate", today);
		scriptProperties.setProperty(
			"lastProcessedRow",
			DEFAULT_START_ROW.toString(),
		);
	}
}

export { resetPropertiesIfNeeded };
