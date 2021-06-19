import _ from 'lodash';
import parser from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const dataFile1 = parser(filepath1);
  const dataFile2 = parser(filepath2);
  const arrFile1 = Object.keys(dataFile1);
  const arrFile2 = Object.keys(dataFile2);
  const unionArr = _.union(arrFile1, arrFile2).sort();
  const resultArr = unionArr.reduce((acc, key) => {
    if (arrFile1.includes(key) && arrFile2.includes(key)) {
      if (dataFile1[key] === dataFile2[key]) {
        acc.push(`    ${key}: ${dataFile1[key]}`);
        return acc;
      }
      acc.push(`  - ${key}: ${dataFile1[key]}`);
      acc.push(`  + ${key}: ${dataFile2[key]}`);
      return acc;
    }
    if (arrFile1.includes(key) && !arrFile2.includes(key)) {
      acc.push(`  - ${key}: ${dataFile1[key]}`);
      return acc;
    }
    acc.push(`  + ${key}: ${dataFile2[key]}`);
    return acc;
  }, []);
  const result = `{\r\n${resultArr.join('\r\n')}\r\n}`;
  console.log(result);
  return result;
};

export default gendiff;
