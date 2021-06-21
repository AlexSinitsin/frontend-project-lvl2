import _ from 'lodash';

const inJson = (json) => {
  const arr = Object.keys(json).sort();
  const result = arr.reduce((acc, key) => {
    const obj = _.clone(acc);
    obj[key] = !_.isObject(json[key].newValue)
      ? json[key].newValue
      : inJson(json[key].newValue);
    return obj;
  }, {});
  return JSON.stringify(result);
};

export default inJson;
