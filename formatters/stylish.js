import _ from 'lodash';

const str = '    ';

const conditon = (json, key, indent, fn) => {
  switch (json[key].state) {
    case 'add':
      return `${str.repeat(indent)}  + ${key}: ${fn(
        json[key].newValue,
        indent + 1,
      )}`;
    case 'remove':
      return `${str.repeat(indent)}  - ${key}: ${fn(
        json[key].preValue,
        indent + 1,
      )}`;
    case 'equal':
      return `${str.repeat(indent)}    ${key}: ${fn(
        json[key].newValue,
        indent + 1,
      )}`;
    case 'update':
      return `${str.repeat(indent)}  - ${key}: ${fn(
        json[key].preValue,
        indent + 1,
      )}\n${str.repeat(indent)}  + ${key}: ${fn(
        json[key].newValue,
        indent + 1,
      )}`;
    default:
  }
  return 'err';
};

const stylish = (json, indent = 0) => {
  if (!_.isObject(json)) {
    return json;
  }
  const arr = _.sortBy(Object.keys(json));
  const resultArr = arr.reduce(
    (acc, key) => [...acc, conditon(json, key, indent, stylish)],
    [],
  );
  const result = `{\n${resultArr.join('\n')}\n${str.repeat(indent)}}`;
  return result;
};

export default stylish;
