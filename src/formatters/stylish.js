import _ from 'lodash';

const makeIndent = (depth) => ' '.repeat(depth * 4);

const prepareValue = (value, depth) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (!(value instanceof Object)) {
    return value;
  }

  const keys = Object.keys(value);
  const indent = makeIndent(depth);

  const innerValues = keys.map((key) => {
    const childrenValue = prepareValue(value[key], depth + 1);
    return `${indent}    ${key}: ${childrenValue}`;
  });
  const preparedValue = innerValues.join('\n');
  return `{\n${preparedValue}\n${indent}}`;
};

export default (diff) => {
  const iter = (data, depth) => data.map(
    ({
      key,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const createString = (sign, value) => `\n${makeIndent(depth - 1)}  ${sign} ${key}: ${value}`;
      switch (type) {
        case 'added':
          return createString('+', (prepareValue(newValue, depth)));
        case 'removed':
          return createString('-', prepareValue(oldValue, depth));
        case 'unchanged':
          return createString(' ', prepareValue(oldValue, depth));
        case 'updated':
          return [createString('-', prepareValue(oldValue, depth)),
            createString('+', prepareValue(newValue, depth)),
          ];
        case 'complex':
          return `\n${makeIndent(depth - 1)}    ${key}: {${iter(children, depth + 1)}\n${makeIndent(depth)}}`;
        default:
          throw new Error(`This type: ${type} is not supported`);
      }
    },
  );
  const stringsCollection = iter(diff, 1);
  const rawResult = _.flattenDeep(['{', stringsCollection, '}']).join('\n');
  const cleanResult = rawResult.replace(/(^[\t]*\n)/gm, '').replace(/(,)/gm, '');
  return cleanResult;
};
