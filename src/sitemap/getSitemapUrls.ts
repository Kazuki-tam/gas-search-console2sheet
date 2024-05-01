/**
 * サイトマップのURLを取得する
 * @param sitemapUrl - サイトマップのURL
 * @returns サイトマップのURLのリスト
 */
function getSitemapUrls(sitemapUrl: string): string[] {
  try {
    // サイトマップのXMLを取得し、テキストとして読み込む
    const sitemapContent = UrlFetchApp.fetch(sitemapUrl).getContentText();
    // XMLをパースしてDOMのような構造にする
    const parsedXml = XmlService.parse(sitemapContent);
    // XMLのルート要素を取得
    const rootElement = parsedXml.getRootElement();

    // 名前空間の取得（存在する場合）
    const namespace = rootElement.getNamespace();

    // 名前空間を考慮して`<url>`要素を全て取得
    const urlElements = namespace
      ? rootElement.getChildren("url", namespace)
      : rootElement.getChildren("url");

    // `<url>`要素から`<loc>`のテキスト（URL）を取得してリスト化
    const urls = urlElements
      .map((urlElement) => {
        const locElement = urlElement.getChild("loc", namespace); // 名前空間を考慮
        return locElement ? locElement.getText() : null;
      })
      .filter((url) => url !== null) as string[];

    return urls;
  } catch (error) {
    // エラーハンドリング: ログ記録、空配列の返却、またはエラーの再スローなど
    console.error("Error fetching or parsing the sitemap:", error);
    return [];
  }
}

export { getSitemapUrls };
