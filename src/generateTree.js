import _ from 'lodash';

const createNode = (key, type, oldValue, newValue, children = null) => (
  {
    key,
    type,
    oldValue,
    newValue,
    children,
  }
);

const generateTree = (firstData, secondData) => {
  const firstDataKeys = Object.keys(firstData);
  const secondDataKeys = Object.keys(secondData);
  const uniqKeys = _.uniq([...firstDataKeys, ...secondDataKeys]);
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    if (firstData[key] === secondData[key]) {
      return createNode(key, 'unchanged', firstData[key], secondData[key]);
    } if (!firstDataKeys.includes(key)) {
      return createNode(key, 'added', null, secondData[key]);
    } if (!secondDataKeys.includes(key)) {
      return createNode(key, 'removed', firstData[key], null);
    } if (firstData[key] instanceof Object && secondData[key] instanceof Object) {
      return createNode(key, 'complex', null, null,
        generateTree(firstData[key], secondData[key]));
    }
    return createNode(key, 'updated', firstData[key], secondData[key]);
  });
};

export default generateTree;
