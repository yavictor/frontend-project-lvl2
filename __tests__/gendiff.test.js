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
const expectedNestedPlain = readFile('resultNestedPlain.txt');
const expectedNestedJson = readFile('resultNestedJson.txt');

test('take difference JSON', () => {
  const firstConfig = 'before.json';
  const secondConfig = 'after.json';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expected);
});

test('take difference yaml', () => {
  const firstConfig = 'before.yml';
  const secondConfig = 'after.yml';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expected);
});

test('take difference ini', () => {
  const firstConfig = 'before.ini';
  const secondConfig = 'after.ini';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expected);
});

test('take difference with nested JSON files', () => {
  const firstConfig = 'beforeNested.json';
  const secondConfig = 'afterNested.json';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expectedNested);
});

test('take difference with nested JSON files, plain output', () => {
  const firstConfig = 'beforeNested.json';
  const secondConfig = 'afterNested.json';
  const result = genDiff(firstConfig, secondConfig, 'plain');
  expect(result).toBe(expectedNestedPlain);
});

test('take difference with nested JSON files, JSON output', () => {
  const firstConfig = 'beforeNested.json';
  const secondConfig = 'afterNested.json';
  const result = genDiff(firstConfig, secondConfig, 'json');
  expect(result).toBe(expectedNestedJson);
});
