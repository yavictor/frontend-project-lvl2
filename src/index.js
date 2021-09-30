import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import parser from './parsers.js';
import format from './formatters/index.js';

const getData = (filename) => {
  let fullPath = '';
  const pathElements = path.parse(filename);
  if (!pathElements.dir) {
    fullPath = path.join(cwd(), '__fixtures__', filename);
  } else {
    fullPath = path.join(cwd(), filename);
  }
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const extension = pathElements.ext;
  return [fileContent, extension];
};

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
  const sortedKeys = uniqKeys.sort();

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

const genDiff = (firstConfig, secondConfig, output = 'stylish') => {
  const firstObject = parser(getData(firstConfig));
  const secondObject = parser(getData(secondConfig));
  const tree = generateTree(firstObject, secondObject);
  return format(tree, output);
};

export default genDiff;
