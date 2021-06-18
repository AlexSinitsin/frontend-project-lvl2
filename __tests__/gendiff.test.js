import { expect, test } from '@jest/globals';
import * as fs from 'fs';
import gendiff from '../src/main.js';

const file1 = new URL('../__fixtures__/file1.json', import.meta.url);
const file2 = new URL('../__fixtures__/file2.json', import.meta.url);
const file3 = new URL('../__fixtures__/result.txt', import.meta.url);
const result = fs.readFileSync(file3, 'utf-8');

test('getdiff', () => {
  expect(gendiff(file1.pathname, file2.pathname)).toEqual(result);
});
