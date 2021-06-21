import _ from 'lodash';

const stylish = (json, indent = 0) => {
  const str = '    ';
  if (!_.isObject(json)) {
    return json;
  }
  const arr = Object.keys(json).sort();
  const resultArr = arr.reduce((acc, key) => {
    const seq = acc;
    switch (json[key].state) {
      case 'add':
        seq.push(
          `${str.repeat(indent)}  + ${key}: ${stylish(
            json[key].newValue,
            indent + 1,
          )}`,
        );
        return seq;
      case 'remove':
        seq.push(
          `${str.repeat(indent)}  - ${key}: ${stylish(
            json[key].preValue,
            indent + 1,
          )}`,
        );
        return seq;
      case 'equal':
        seq.push(
          `${str.repeat(indent)}    ${key}: ${stylish(
            json[key].newValue,
            indent + 1,
          )}`,
        );
        return seq;
      case 'update':
        seq.push(
          `${str.repeat(indent)}  - ${key}: ${stylish(
            json[key].preValue,
            indent + 1,
          )}`,
        );
        seq.push(
          `${str.repeat(indent)}  + ${key}: ${stylish(
            json[key].newValue,
            indent + 1,
          )}`,
        );
        return seq;
      default:
        return seq;
    }
  }, []);
  const result = `{\n${resultArr.join('\n')}\n${str.repeat(indent)}}`;
  return result;
};

export default stylish;
