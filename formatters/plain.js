import _ from 'lodash';

const plain = (json1, json2, path = '') => {
  const arrFile1 = Object.keys(json1);
  const arrFile2 = Object.keys(json2);
  const unionArr = _.union(arrFile1, arrFile2).sort();
  const resultArr = unionArr.reduce((acc, key) => {
    const before = !_.isString(json1[key]) ? json1[key] : `'${json1[key]}'`;
    const after = !_.isString(json2[key]) ? json2[key] : `'${json2[key]}'`;
    if (arrFile1.includes(key) && arrFile2.includes(key)) {
      if (_.isObject(json1[key]) && !_.isObject(json2[key])) {
        acc.push(
          `Property '${path}${key}' was updated. From [complex value] to ${after}`,
        );
        return acc;
      }
      if (!_.isObject(json1[key]) && _.isObject(json2[key])) {
        acc.push(
          `Property '${path}${key}' was updated. From ${before} to [complex value]`,
        );
        return acc;
      }
      if (_.isObject(json1[key]) && _.isObject(json2[key])) {
        acc.push(`${plain(json1[key], json2[key], `${path}${key}.`)}`);
        return acc;
      }
      if (json1[key] !== json2[key]) {
        acc.push(
          `Property '${path}${key}' was updated. From ${before} to ${after}`,
        );
        return acc;
      }
      if (json1[key] === json2[key]) {
        return acc;
      }
    }
    if (arrFile1.includes(key) && !arrFile2.includes(key)) {
      if (_.isObject(json1[key])) {
        acc.push(`Property '${path}${key}' was removed`);
        return acc;
      }
      acc.push(`Property '${path}${key}' was removed`);
      return acc;
    }
    if (_.isObject(json2[key])) {
      acc.push(
        `Property '${path}${key}' was added with value: [complex value]`,
      );
      return acc;
    }
    acc.push(`Property '${path}${key}' was added with value: ${after}`);
    return acc;
  }, []);
  const result = `${resultArr.join('\r\n')}`;
  return result;
};

export default plain;
