import _ from 'lodash';

const inJson = (json) => {
  const arr = Object.keys(json).sort();
  const result = arr.reduce((acc, key) => {
    acc[key] = !_.isObject(json[key].newValue)
      ? json[key].newValue
      : inJson(json[key].newValue);
    return acc;
  }, {});
  return JSON.stringify(result);
};

export default inJson;
