import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const json1 = JSON.parse(file1);
  const json2 = JSON.parse(file2);
  const arrJson1 = Object.keys(json1);
  const arrJson2 = Object.keys(json2);
  const unionArr = _.union(arrJson1, arrJson2).sort();
  const resultArr = unionArr.reduce((acc, key) => {
    if (arrJson1.includes(key) && arrJson2.includes(key)) {
      if (json1[key] === json2[key]) {
        acc.push(`    ${key}: ${json1[key]}`);
        return acc;
      }
      acc.push(`  - ${key}: ${json1[key]}`);
      acc.push(`  + ${key}: ${json2[key]}`);
      return acc;
    }
    if (arrJson1.includes(key) && !arrJson2.includes(key)) {
      acc.push(`  - ${key}: ${json1[key]}`);
      return acc;
    }
    acc.push(`  + ${key}: ${json2[key]}`);
    return acc;
  }, []);
  const result = `{\n${resultArr.join('\n')}\n}`;
  console.log(result);
  return result;
};

export default gendiff;