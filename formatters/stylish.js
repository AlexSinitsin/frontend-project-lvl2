import _ from 'lodash';

const stylish = (json, indent = 0) => {
  const str = '    ';
  if (!_.isObject(json)) {
    return json;
  }
  const arr = Object.keys(json).sort();
  const resultArr = arr.reduce((acc, key) => {
    switch (json[key].state) {
      case 'add':
        acc.push(
          `${str.repeat(indent)}  + ${key}: ${stylish(
            json[key].newValue,
            indent + 1,
          )}`,
        );
        return acc;
      case 'remove':
        acc.push(
          `${str.repeat(indent)}  - ${key}: ${stylish(
            json[key].preValue,
            indent + 1,
          )}`,
        );
        return acc;
      case 'equal':
        acc.push(
          `${str.repeat(indent)}    ${key}: ${stylish(
            json[key].newValue,
            indent + 1,
          )}`,
        );
        return acc;
      case 'update':
        acc.push(
          `${str.repeat(indent)}  - ${key}: ${stylish(
            json[key].preValue,
            indent + 1,
          )}`,
        );
        acc.push(
          `${str.repeat(indent)}  + ${key}: ${stylish(
            json[key].newValue,
            indent + 1,
          )}`,
        );
        return acc;
      default:
        return acc;
    }
  }, []);
  const result = `{\n${resultArr.join('\n')}\n${str.repeat(indent)}}`;
  return result;
};

export default stylish;
