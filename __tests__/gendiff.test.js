import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expected = readFile('result.txt');
const expectedNested = readFile('resultNested.txt');
console.log('expected', expected);

test('take difference JSON', () => {
  const firstConfig = ('__fixtures__/before.json');
  const secondConfig = ('__fixtures__/after.json');
  console.log('f&s config', firstConfig, secondConfig);
  const result = genDiff(firstConfig, secondConfig);
  console.log('result', result);
  expect(result).toEqual(expected);
});

// test('take difference yaml', () => {
//   const firstConfig = parser(getFixturePath('before.yml'));
//   const secondConfig = parser(getFixturePath('after.yml'));
//   const result = genDiff(firstConfig, secondConfig);
//   expect(result).toEqual(expected);
// });

// test('take difference ini', () => {
//   const firstConfig = parser(getFixturePath('before.ini'));
//   const secondConfig = parser(getFixturePath('after.ini'));
//   const result = genDiff(firstConfig, secondConfig);
//   expect(result).toEqual(expected);
// });

// test('take difference nested JSON', () => {
//   const firstConfig = parser(getFixturePath('beforeNested.json'));
//   const secondConfig = parser(getFixturePath('afterNested.json'));
//   const result = genDiff(firstConfig, secondConfig);
//   expect(result).toEqual(expectedNested);
// });
