import { expect, test } from '@jest/globals';
import * as fs from 'fs';
import gendiff from '../src/main.js';

const fileJson1 = new URL('../__fixtures__/file1.json', import.meta.url);
const fileJson2 = new URL('../__fixtures__/file2.json', import.meta.url);

const fileYaml1 = new URL('../__fixtures__/file1.yml', import.meta.url);
const fileYaml2 = new URL('../__fixtures__/file2.yml', import.meta.url);

const fileResult = new URL('../__fixtures__/result.txt', import.meta.url);
const result = fs.readFileSync(fileResult, 'utf-8');

test('getdiff', () => {
  expect(gendiff(fileJson1.pathname, fileJson2.pathname)).toEqual(result);
  expect(gendiff(fileYaml1.pathname, fileYaml2.pathname)).toEqual(result);
});
