import gendiff from '../src/main.js';

test('getdiff', () => {
  const file1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }
  
  const file2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  }
  
  const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

  expect(gendiff('../frontend-project-lvl2/__fixtures__/file1.json', '../frontend-project-lvl2/__fixtures__/file2.json')).toEqual(result); 
});