import fs from 'fs';
import path from 'path';
import genDiff from '..';
import parser from '../src/parsers';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedResult = readFile('result.txt');

test('take difference JSON', () => {
  const firstConfig = parser(getFixturePath('before.json'));
  const secondConfig = parser(getFixturePath('after.json'));
  const result = genDiff(firstConfig, secondConfig);
  expect(expectedResult).toEqual(result);
});

test('take difference yaml', () => {
  const firstConfig = parser(getFixturePath('before.yml'));
  const secondConfig = parser(getFixturePath('after.yml'));
  const result = genDiff(firstConfig, secondConfig);
  expect(expectedResult).toEqual(result);
});

test('take difference ini', () => {
  const firstConfig = parser(getFixturePath('before.ini'));
  const secondConfig = parser(getFixturePath('after.ini'));
  const result = genDiff(firstConfig, secondConfig);
  expect(expectedResult).toEqual(result);
});
