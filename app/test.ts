interface Abc {
    a: string;
    b: string;
    c: string;
}

function asd(abc: Abc) {
    console.log(abc);
}

asd(JSON.parse('{\"abcdefg\": \"b\"}') as Abc);