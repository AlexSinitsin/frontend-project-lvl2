import { test, expect } from 'jest';
import gendiff from '../src/main.js';

test('getdiff', () => {
  const file1 = '../frontend-project-lvl2/__fixtures__/file1.json';

  const file2 = '../frontend-project-lvl2/__fixtures__/file2.json';

  expect(gendiff(file1, file2)).toEqual('result');
});
