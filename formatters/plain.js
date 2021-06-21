import _ from 'lodash';

const plain = (json, path = '') => {
  const arr = Object.keys(json).sort();
  const result = arr
    .reduce((acc, key) => {
      const seq = _.clone(acc);
      const isObjectBefore = _.isObject(json[key].preValue)
        ? '[complex value]'
        : json[key].preValue;
      const before = !_.isString(isObjectBefore) || isObjectBefore === '[complex value]'
        ? isObjectBefore
        : `'${isObjectBefore}'`;
      const isObjectAfter = _.isObject(json[key].newValue)
        ? '[complex value]'
        : json[key].newValue;
      const after = !_.isString(isObjectAfter) || isObjectAfter === '[complex value]'
        ? isObjectAfter
        : `'${isObjectAfter}'`;
      switch (json[key].state) {
        case 'add':
          seq.push(`Property '${path}${key}' was added with value: ${after}`);
          return seq;
        case 'remove':
          seq.push(`Property '${path}${key}' was removed`);
          return seq;
        case 'update':
          seq.push(
            `Property '${path}${key}' was updated. From ${before} to ${after}`,
          );
          return seq;
        case 'equal':
          if (!_.isObject(json[key].newValue)) {
            return seq;
          }
          seq.push(`${plain(json[key].newValue, `${path}${key}.`)}`);
          return seq;
        default:
          return seq;
      }
    }, [])
    .join('\n');
  return result;
};

export default plain;
