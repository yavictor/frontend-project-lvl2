import _ from 'lodash';

const prepareValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value instanceof Object) {
    return '[complex value]';
  }
  return value;
};

export default (diff) => {
  const iter = (data, ancestors) => data.map(
    ({
      key,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const preparedOldValue = prepareValue(oldValue);
      const preparedNewValue = prepareValue(newValue);
      const pathToProperty = [...ancestors, key].join('.');
      switch (type) {
        case 'complex':
          return iter(children, [...ancestors, key]);
        case 'added':
          return `Property '${pathToProperty}' was added with value: ${preparedNewValue}`;
        case 'removed':
          return `Property '${pathToProperty}' was removed`;
        case 'unchanged':
          return [];
        case 'updated':
          return `Property '${pathToProperty}' was updated. From ${preparedOldValue} to ${preparedNewValue}`;
        default:
          throw new Error(`This type: ${type} is not supported.`);
      }
    },
  );

  return _.flattenDeep(iter(diff, [])).join('\n');
};
