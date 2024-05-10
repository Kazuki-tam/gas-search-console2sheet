import { formatDate } from "../../utils/formatDate";
import { getSheetForToday } from "./getSheetForToday";
import { resetPropertiesIfNeeded } from "./resetPropertiesIfNeeded";
import { calculateRowRange } from "./calculateRowRange";
import { extractUrls } from "./extractUrls";
import { processUrls } from "./processUrls";
import { recordStatuses } from "./recordStatuses";
import { updatePropertiesPostProcessing } from "./updatePropertiesPostProcessing";

/**
 * 指定したURLのインデックス状況をスプレッドシートに記録します。
 */
function writeIndexStatus() {
	const today = formatDate(new Date());
	const sheet = getSheetForToday(today);
	const scriptProperties = PropertiesService.getScriptProperties();
	resetPropertiesIfNeeded(scriptProperties, today, sheet);

	const { startRow, endRow } = calculateRowRange(scriptProperties, sheet);
	const urls = extractUrls(sheet, startRow, endRow);

	const {
		indexStatuses,
		coverageStatuses,
		inspectionResultLinks,
		referringUrls,
	} = processUrls(urls);

	// インデックス状況とカバレッジ状況を記録
	recordStatuses(sheet, startRow, {
		inspectionResultLinks,
		indexStatuses,
		coverageStatuses,
		referringUrls,
	});

	updatePropertiesPostProcessing(scriptProperties, endRow, sheet.getLastRow());
}

export { writeIndexStatus };
