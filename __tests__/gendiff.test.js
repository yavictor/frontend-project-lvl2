import genDiff from '..';
import fs from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// Jest поддерживает async/await функции
test('take difference', async () => {
  const firstConfig = readFile('before.json');
  const secondConfig = readFile('after.json');
  const expectedResult = readFile('result.txt');
  const result = genDiff(JSON.parse(firstConfig), JSON.parse(secondConfig));
  expect(expectedResult).toEqual(result);
});
