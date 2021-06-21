import _ from 'lodash';

const createJson = (json1, json2) => {
  const inJson1 = !_.isObject(json1) ? json2 : json1;
  const inJson2 = !_.isObject(json2) ? json1 : json2;
  const arrFile1 = Object.keys(inJson1);
  const arrFile2 = Object.keys(inJson2);
  const unionArr = _.union(arrFile1, arrFile2);
  const resultJson = unionArr.reduce((acc, key) => {
    const obj = _.clone(acc);
    obj[key] = {};
    if (!arrFile1.includes(key)) {
      obj[key].state = 'add';
      obj[key].newValue = _.isObject(inJson2[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson2[key];
    }
    if (!arrFile2.includes(key)) {
      obj[key].state = 'remove';
      obj[key].preValue = _.isObject(inJson1[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson1[key];
    }
    if (arrFile1.includes(key) && arrFile2.includes(key)) {
      obj[key].state = 'equal';
      obj[key].newValue = _.isObject(inJson2[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson2[key];
      obj[key].preValue = _.isObject(inJson1[key])
        ? createJson(inJson1[key], inJson2[key])
        : inJson1[key];
      if (!_.isObject(inJson1[key]) || !_.isObject(inJson2[key])) {
        obj[key].state = inJson1[key] === inJson2[key] ? 'equal' : 'update';
      }
    }
    return obj;
  }, {});
  return resultJson;
};

export default createJson;
