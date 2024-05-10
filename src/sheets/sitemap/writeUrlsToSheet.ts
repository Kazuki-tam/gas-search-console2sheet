import { formatDate } from "../../utils/formatDate";
import { createSheet } from "../createSheet";
import { writeDataToSheet } from "./writeDataToSheet";
import { setColumnWidths } from "./setColumnWidths";

/**
 * URLと関連情報をシートに書き込む
 * @param {string[]} urls - URLのリスト
 */
function writeUrlsToSheet(urls: string[]): void {
	const sheetName = formatDate(new Date());
	const { sheet, isCreated } = createSheet(sheetName);

	// シートが作成済みの場合は処理を終了
	if (isCreated) return;

	// ヘッダー行を含む二次元配列を初期化
	const header: string[][] = [
		[
			"対象ページURL",
			"検査URL",
			"インデックス作成状態",
			"カバレッジ状態",
			"参照元URL",
		],
	];

	// URLリストを二次元配列に変換
	const values: string[][] = urls.map((url) => [url, "", "", "", ""]);

	// ヘッダー行とURLリストを結合
	const dataToWrite: string[][] = header.concat(values);

	// サイトマップ情報をバッチ処理でシートに書き込む
	writeDataToSheet(sheet, dataToWrite);

	// 列の幅を設定
	setColumnWidths(sheet, [300, 200, 200, 200, 200]);

	// 文字の折り返しを切り詰めに設定
	sheet
		.getRange(1, 1, dataToWrite.length, dataToWrite[0].length)
		.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
}

export { writeUrlsToSheet };
