{
    function assertDeepEqual(actual, expected, message) {
        const pass = JSON.stringify(actual) === JSON.stringify(expected);
        if (pass) {
            console.log('✅', message);
        } else {
            console.error('❌', message, '\n  actual:', actual, '\n  expected:', expected);
        }
    }

    let csv = 'a,b,c\n1,2,3\n4,5,6\n';
    let result = CSVParser.parse(csv);
    assertDeepEqual(result, [
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['4', '5', '6']
    ], 'オーソドックスなCSV');

    result = CSVParser.parse(csv, { useHeaderAsKey: true });
    assertDeepEqual(result, [
        { a: '1', b: '2', c: '3' },
        { a: '4', b: '5', c: '6' }
    ], 'useHeaderAsKeyオプション指定時、1行目のヘッダーをキーにしてオブジェクトを生成');

    csv = 'a,"b",c\n"1",2,3\n4,5,"6"\n';
    result = CSVParser.parse(csv);
    assertDeepEqual(result, [
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['4', '5', '6']
    ], '値が"で囲まれているCSV');

    csv = 'a,"b""c""d",c\n"""1",2,3\n4,5,"""6"""""""\n';
    result = CSVParser.parse(csv);
    assertDeepEqual(result, [
        ['a', 'b"c"d', 'c'],
        ['"1', '2', '3'],
        ['4', '5', '"6"""']
    ], '内容に"を含むCSV');

    csv = 'a,"\nb""\n\n",c\n"1\r\n",2,3\n4,5,"6"\n';
    result = CSVParser.parse(csv);
    assertDeepEqual(result, [
        ['a', '\nb"\n\n', 'c'],
        ['1\r\n', '2', '3'],
        ['4', '5', '6']
    ], '内容に改行を含むCSV');

    csv = 'a,,c\n,2,3\n4,5,\n';
    result = CSVParser.parse(csv);
    assertDeepEqual(result, [
        ['a', '', 'c'],
        ['', '2', '3'],
        ['4', '5', '']
    ], '空のセル');
}
