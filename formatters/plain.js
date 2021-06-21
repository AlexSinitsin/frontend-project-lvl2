import _ from 'lodash';

const plain = (json, path = '') => {
  const arr = Object.keys(json).sort();
  const result = arr
    .reduce((acc, key) => {
      const isObjectBefore = _.isObject(json[key].preValue)
        ? '[complex value]'
        : json[key].preValue;
      const before = !_.isString(isObjectBefore)
        ? json[key].preValue
        : `'${json[key].preValue}'`;
      const isObjectAfter = _.isObject(json[key].newValue)
        ? '[complex value]'
        : json[key].newValue;
      const after = !_.isString(isObjectAfter)
        ? json[key].newValue
        : `'${json[key].newValue}'`;
      switch (json[key].state) {
        case 'add':
          acc.push(`Property '${path}${key}' was added with value: ${after}`);
          return acc;
        case 'remove':
          acc.push(`Property '${path}${key}' was removed`);
          return acc;
        case 'update':
          acc.push(
            `Property '${path}${key}' was updated. From ${before} to ${after}`,
          );
          return acc;
        case 'equal':
          if (!_.isObject(json[key].newValue)) {
            return acc;
          }
          acc.push(`${plain(json[key].newValue, `${path}${key}.`)}`);
          return acc;
        default:
          return acc;
      }
    }, [])
    .join('\r\n');
  return result;
};

export default plain;
