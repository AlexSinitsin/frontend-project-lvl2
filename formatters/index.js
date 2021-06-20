import parser from './parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = parser(filepath1);
  const dataFile2 = parser(filepath2);
  const result =
    format === 'stylish'
      ? stylish(dataFile1, dataFile2)
      : plain(dataFile1, dataFile2);
  console.log(result);
  return result;
};

export default gendiff;
