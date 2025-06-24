// Copyright (c) 2025 crabspider
// MIT License
// https://github.com/crabspider/CSVParser.js

class CSVParser {
	static parse(csvString, config = {}) {
		// パース手法 「"の出現数が偶数の状態で,\nが来たら列/行確定とする」
		const result = [];
		let row = config.useHeaderAsKey ? {} : [];
		let cellStart = 0;
		let qmCount = 0;

		// useHeaderAsKey用
		let firstRow = [];
		let isFirstRow = true;
		let currentCol = 0;

		// 最終行の処理を簡単にするため、最後が必ず改行コードになるようにする
		csvString = csvString.trimEnd() + '\n';

		for (let i = 0; i < csvString.length; i++) {
			if (csvString[i] === '"') {
				qmCount++;
			} else if ((csvString[i] === ',' || csvString[i] === '\n') && qmCount % 2 === 0) {
				let cellString;
				if (csvString.charAt(cellStart) === '"') {
					cellString = csvString.slice(cellStart + 1, i - 1);
				} else {
					cellString = csvString.slice(cellStart, i);
				}
				cellString = cellString.replaceAll('""', '"');

				if (config.useHeaderAsKey) {
					if (isFirstRow) {
						firstRow.push(cellString);
					} else {
						row[firstRow[currentCol]] = cellString;
					}
				} else {
					row.push(cellString);
				}

				cellStart = i + 1;
				qmCount = 0;
				currentCol++;

				if (csvString[i] === '\n') {
					if (!(isFirstRow && config.useHeaderAsKey)) {
						result.push(row);
					}
					row = config.useHeaderAsKey ? {} : [];
					currentCol = 0;
					isFirstRow = false;
				}
			}
		}

		return result;
	}
}
