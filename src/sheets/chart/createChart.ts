function createChart() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultSheet = ss.getSheetByName("集計結果");

  if (!resultSheet) {
    Logger.log("集計結果シートが見つかりません。");
    return;
  }

  // データの準備
  const lastRow = resultSheet.getLastRow();
  // A列:日付、B列:登録済、C列:登録除外、D列:エラー からデータを取得
  const dataRange = resultSheet.getRange("A1:D" + lastRow);

  // 積み上げ面グラフを作成
  const chartBuilder = resultSheet
    .newChart()
    .setChartType(Charts.ChartType.AREA)
    .addRange(dataRange)
    .setPosition(5, 8, 0, 0)
    .setNumHeaders(1)
    .setOption("title", "インデックス登録件数の推移")
    .setOption("hAxis", { title: "日付" })
    .setOption("vAxis", { title: "件数" })
    .setOption("legend", { position: "top" })
    .setOption("isStacked", true)
    // A列をX軸として使用
    .setOption("useFirstColumnAsDomain", true);

  // チャートをシートに挿入
  resultSheet.insertChart(chartBuilder.build());
}

export { createChart };
