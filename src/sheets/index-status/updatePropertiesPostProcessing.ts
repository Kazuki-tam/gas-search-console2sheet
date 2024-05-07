import { DEFAULT_START_ROW } from "../constants";

/**
 * スクリプトプロパティを更新します。
 * @param {GoogleAppsScript.Properties.Properties} scriptProperties - スクリプトプロパティ
 * @param {number} endRow - 終了行
 * @param {number} lastRow - 最終行
 */
function updatePropertiesPostProcessing(
  scriptProperties: GoogleAppsScript.Properties.Properties,
  endRow: number,
  lastRow: number
) {
  if (endRow >= lastRow) {
    scriptProperties.setProperty(
      "lastProcessedRow",
      DEFAULT_START_ROW.toString()
    );
  } else {
    scriptProperties.setProperty("lastProcessedRow", (endRow + 1).toString());
  }
}

export { updatePropertiesPostProcessing };
