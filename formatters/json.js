import _ from 'lodash';

const plain = (json1, json2) => {
  const arrFile1 = Object.keys(json1);
  const arrFile2 = Object.keys(json2);
  const unionArr = _.union(arrFile1, arrFile2).sort();
  const result = unionArr.reduce((acc, key) => {
    if (arrFile1.includes(key) && arrFile2.includes(key)) {
      if (_.isObject(json1[key]) && _.isObject(json2[key])) {
        acc[key] = plain(json1[key], json2[key]);
      }
      acc[key] = json2[key];
      return acc;
    }
    if (arrFile1.includes(key) && !arrFile2.includes(key)) {
      return acc;
    }
    acc[key] = json2[key];
    return acc;
  }, {});
  return JSON.stringify(result);
};

export default plain;
