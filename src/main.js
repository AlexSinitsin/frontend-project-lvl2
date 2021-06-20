import parser from './parsers.js';
import stylish from './stylish.js';

const gendiff = (filepath1, filepath2) => {
  const dataFile1 = parser(filepath1);
  const dataFile2 = parser(filepath2);
  const result = stylish(dataFile1, dataFile2);
  console.log(result);
  return result;
};

export default gendiff;
