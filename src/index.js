import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parser from './parsers.js';
import format from './formatters/index.js';
import generateTree from './generateTree.js';

const getData = (filename) => {
  const pathElements = path.parse(filename);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (pathname) => path.join(__dirname, '..', '__fixtures__', pathname);
  const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
  const fileContent = readFile(pathElements.base);

  const extension = pathElements.ext;
  return [fileContent, extension];
};

export default (firstConfig, secondConfig, output = 'stylish') => {
  const firstObject = parser(...getData(firstConfig));
  const secondObject = parser(...getData(secondConfig));
  const tree = generateTree(firstObject, secondObject);
  return format(tree, output);
};
