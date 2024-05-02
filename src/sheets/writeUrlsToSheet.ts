import { formatDate } from "../utils/formatDate";
import { createSheet } from "./createSheet";

/**
 * URLと関連情報をシートに書き込む
 * @param {string[]} urls - URLのリスト
 */
function writeUrlsToSheet(urls: string[]) {
  const implementationDate = new Date();
  const sheetName = formatDate(implementationDate);
  const { sheet, isCreated } = createSheet(sheetName);

  // シートが作成済みの場合は処理を終了
  if (isCreated) {
    return;
  }

  // ヘッダー行を含む二次元配列を初期化
  const header = [
    [
      "対象ページURL",
      "検査URL",
      "インデックス作成状態",
      "カバレッジ状態",
      "参照元URL",
    ],
  ];
  // URLリストを二次元配列に変換
  const values = urls.map((url) => [url, "", "", "", ""]);

  // ヘッダー行とURLリストを結合
  const dataToWrite = header.concat(values);

  // サイトマップ情報をバッチ処理でシートに書き込む
  sheet
    .getRange(1, 1, dataToWrite.length, dataToWrite[0].length)
    .setValues(dataToWrite);

  // 1行目の背景色をブルー系に設定
  sheet
    .getRange(1, 1, 1, dataToWrite[0].length)
    .setBackground("#191970")
    .setFontColor("#FFFFFF");

  // 1列目の幅を広く設定
  sheet.setColumnWidth(1, 300);

  // 2列目の幅を広く設定
  sheet.setColumnWidth(2, 200);

  // 3列目の幅を広く設定
  sheet.setColumnWidth(3, 200);

  // 4列目の幅を広く設定
  sheet.setColumnWidth(4, 200);

  // 5列目の幅を広く設定
  sheet.setColumnWidth(5, 200);

  // 6列目の幅を広く設定
  sheet.setColumnWidth(6, 200);

  // 文字の折り返しを切り詰めに設定
  sheet
    .getRange(1, 1, dataToWrite.length, dataToWrite[0].length)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
}

export { writeUrlsToSheet };
