import { expect, test } from '@jest/globals';
import gendiff from '../src/main.js';

const file1 = new URL('../__fixtures__/file1.json', import.meta.url);
const file2 = new URL('../__fixtures__/file2.json', import.meta.url);

const result = '{\n  ' +
    '- follow: false\n  ' +
    '  host: hexlet.io\n  ' +
    '- proxy: 123.234.53.22\n  ' +
    '- timeout: 50\n  ' +
    '+ timeout: 20\n  ' +
    '+ verbose: true\n' +
  '}';

test('getdiff', () => {
  expect(gendiff(file1.pathname, file2.pathname)).toEqual(result);
});
