# Search Console検査自動化（β）

Google Search Consoleの情報をスプレッドシートに出力するGoogle Apps Scriptプロジェクトです。

## 主な機能
- URLのインデックス状況を取得
- インデックス状況の推移を整理

## 主な依存関係

- [Google Apps Script](https://workspace.google.co.jp/intl/ja/products/apps-script/)
- [Clasp](https://github.com/google/clasp)

## 必要な環境

- [Bun](https://bun.sh/)

## 利用方法

このリポジトリをクローンし、依存関係をインストールします。

```bash
bun install
```

### Googleアカウントにログイン

```shell
bun clasp:login
```

### Google Apps Scriptプロジェクトを作成

`.clasp.json`を作成し、以下の設定を追加します。
スクリプトIDを取得し、`<SCRIPT_ID>`に置き換えます。

```json
{
  "scriptId": "<SCRIPT_ID>",
  "rootDir": "./dist"
}
```

コードをスクリプトにデプロイします。

```shell
bun release
```

## 利用可能なコマンド

プロジェクトのビルドを行います。

```shell
bun postBuild
```

プロジェクトコードをビルドし、スクリプトをデプロイします。

```shell
bun release
```

スクリプトを開きます。

```shell
bun clasp:open
```

## License
MIT