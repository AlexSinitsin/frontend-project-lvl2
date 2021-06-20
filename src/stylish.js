import _ from 'lodash';

const stylish = (json1, json2, indent = 0) => {
  const str = '    ';
  const arrFile1 = Object.keys(json1);
  const arrFile2 = Object.keys(json2);
  const unionArr = _.union(arrFile1, arrFile2).sort()
  const resultArr = unionArr.reduce((acc, key) => {
    if (arrFile1.includes(key) && arrFile2.includes(key)) {
      if (_.isObject(json1[key]) && !_.isObject(json2[key])) {
        acc.push(`${str.repeat(indent)}  - ${key}: ${stylish(json1[key], json1[key], indent + 1)}`);
        acc.push(`${str.repeat(indent)}  + ${key}: ${json2[key]}`);
        return acc;
      }
      if (!_.isObject(json1[key]) && _.isObject(json2[key])) {
        acc.push(`${str.repeat(indent)}  - ${key}: ${json1[key]}`);
        acc.push(`${str.repeat(indent)}  + ${key}: ${stylish(json2[key], json2[key], indent + 1)}`);
        return acc;
      }
      if (_.isObject(json1[key]) && _.isObject(json2[key])) {
        acc.push(`${str.repeat(indent)}    ${key}: ${stylish(json1[key], json2[key], indent + 1)}`);
        return acc;
      }
      if (json1[key] === json2[key]) {
        acc.push(`${str.repeat(indent)}    ${key}: ${json1[key]}`);
        return acc;
      }
      acc.push(`${str.repeat(indent)}  - ${key}: ${json1[key]}`);
      acc.push(`${str.repeat(indent)}  + ${key}: ${json2[key]}`);
      return acc;
    }
    if (arrFile1.includes(key) && !arrFile2.includes(key)) {
      if (_.isObject(json1[key])) {
        acc.push(`${str.repeat(indent)}  - ${key}: ${stylish(json1[key], json1[key], indent + 1)}`);
        return acc;
      }
      acc.push(`${str.repeat(indent)}  - ${key}: ${json1[key]}`);
      return acc;
    }
    if (_.isObject(json2[key])) {
      acc.push(`${str.repeat(indent)}  + ${key}: ${stylish(json2[key], json2[key], indent + 1)}`);
      return acc;
    }
    acc.push(`${str.repeat(indent)}  + ${key}: ${json2[key]}`);
    return acc;
  }, []);
  const result = `{\r\n${resultArr.join('\r\n')}\r\n${str.repeat(indent)}}`;
  return result;
};

export default stylish;
