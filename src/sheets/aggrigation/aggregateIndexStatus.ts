function aggregateIndexStatus() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  let resultSheet = ss.getSheetByName("集計結果");

  // 集計結果シートがなければ作成
  if (!resultSheet) {
    resultSheet = ss.insertSheet("集計結果");
  }

  // 既存のデータをクリア
  resultSheet.clearContents();
  // ヘッダーを設定
  const headers = ["日付", "登録済", "登録除外", "エラー", "その他", "合計"];
  resultSheet.appendRow(headers);

  const headerRange = resultSheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#191970");
  // ヘッダーの文字色を白に設定（オプション）
  headerRange.setFontColor("#FFFFFF");

  allSheets.forEach(function (sheet) {
    const sheetName = sheet.getName();
    // シート名が日付形式（YYYY-MM-DD）でなければ除外
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(sheetName)) return;

    // シート名から日付を取得
    const date = sheetName;
    const dataRange = sheet.getDataRange();
    let values = dataRange.getValues();

    // ヘッダー行を除外
    values = values.slice(1);

    // インデックス状態を集計
    let passCount = 0;
    let neutralCount = 0;
    let errorCount = 0;
    let otherCount = 0;
    values.forEach(function (row) {
      const status = row[2];
      switch (status) {
        case "PASS":
          passCount++;
          break;
        case "NEUTRAL":
          neutralCount++;
          break;
        case "FAIL":
          errorCount++;
          break;
        default:
          otherCount++;
      }
    });

    // 合計を算出
    const totalCount = passCount + neutralCount + errorCount + otherCount;

    // 集計結果を追加
    resultSheet.appendRow([
      date,
      passCount,
      neutralCount,
      errorCount,
      otherCount,
      totalCount,
    ]);
  });
}

export { aggregateIndexStatus };
