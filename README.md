# CSVParser.js

CSVをパースする。

## コンセプト

- なるべくシンプル
- Excelの出力するCSVを読める

## 想定するCSVの仕様

- ,で列を区切る
- \nで行を区切る
- "で囲われたセル中では,\nが使用可能
- "を表現する際は""とする

Excel前提なのに\n前提というのも変な話かと思いますが、その辺りは入力時にreplaceAllするという事でご了承願います。

## 想定していない入力

- 不正なCSV
- BOM
- 改行コードが\n以外のCSV
- 空行が含まれるCSV

## 使い方

```javascript
CSVParser.parse(csvString)
```

```javascript
CSVParser.parse(csvString, {useHeaderAsKey: true})
```

出力例はCSVParser.test.jsを参照して下さい。
