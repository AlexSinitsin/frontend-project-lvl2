import _ from 'lodash';

const createJson = (json1, json2) => {
  const inJson1 = !_.isObject(json1) ? json2 : json1;
  const inJson2 = !_.isObject(json2) ? json1 : json2;
  const arrFile1 = Object.keys(inJson1);
  const arrFile2 = Object.keys(inJson2);
  const unionArr = _.union(arrFile1, arrFile2);
  const resultJson = unionArr.reduce((acc, key) => {
    acc[key] = {};
    if (!arrFile1.includes(key)) {
      acc[key].state = 'add';
      acc[key].newValue = _.isObject(inJson2[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson2[key];
    }
    if (!arrFile2.includes(key)) {
      acc[key].state = 'remove';
      acc[key].preValue = _.isObject(inJson1[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson1[key];
    }
    if (arrFile1.includes(key) && arrFile2.includes(key)) {
      acc[key].state = 'equal';
      acc[key].newValue = _.isObject(inJson2[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson2[key];
      acc[key].preValue = _.isObject(inJson1[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson1[key];
      if (!_.isObject(inJson2[key]) || !_.isObject(inJson2[key])) {
        acc[key].state = inJson1[key] === inJson2[key] ? 'equal' : 'update';
      }
      if (_.isObject(inJson2[key]) && _.isObject(inJson2[key])) {
        acc[key].state = 'equal';
      }
    }
    return acc;
  }, {});
  return resultJson;
};

export default createJson;
