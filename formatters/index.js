import parser from './parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = parser(filepath1);
  const dataFile2 = parser(filepath2);
  switch (format) {
    case 'stylish':
      return stylish(dataFile1, dataFile2);
    case 'plain':
      return plain(dataFile1, dataFile2);
    case 'json':
      return json(dataFile1, dataFile2);
    default:
      return stylish(dataFile1, dataFile2);
  }
};

export default gendiff;
