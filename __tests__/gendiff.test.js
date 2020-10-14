import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


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
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toEqual(expected);
});

test('take difference yaml', () => {
  const firstConfig = ('__fixtures__/before.yml');
  const secondConfig = ('__fixtures__/after.yml');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toEqual(expected);
});

test('take difference ini', () => {
  const firstConfig = ('__fixtures__/before.ini');
  const secondConfig = ('__fixtures__/after.ini');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toEqual(expected);
});

// test('take difference nested JSON', () => {
//   const firstConfig = parser(getFixturePath('beforeNested.json'));
//   const secondConfig = parser(getFixturePath('afterNested.json'));
//   const result = genDiff(firstConfig, secondConfig);
//   expect(result).toEqual(expectedNested);
// });
