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
  const firstConfig = 'after.json';
  const secondConfig = 'before.json';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expected);
});

test('take difference yaml', () => {
  const firstConfig = 'file1.yml';
  const secondConfig = 'file2.yml';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expectedNested);
});

test('take difference ini', () => {
  const firstConfig = 'file1.ini';
  const secondConfig = 'file2.ini';
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(expected);
});

test('take difference with nested JSON files', () => {
  const firstConfig = 'file1.json';
  const secondConfig = '/__fixtures__/file2.json';
  const result = genDiff(firstConfig, secondConfig, 'stylish');
  expect(result).toBe(expectedNested);
});

test('take difference with nested JSON files, plain output', () => {
  const firstConfig = 'file1.json';
  const secondConfig = 'file2.json';
  const result = genDiff(firstConfig, secondConfig, 'plain');
  expect(result).toBe(expectedNestedPlain);
});

test('take difference with nested JSON files, JSON output', () => {
  const firstConfig = 'file1.json';
  const secondConfig = 'file2.json';
  const result = genDiff(firstConfig, secondConfig, 'json');
  expect(result).toBe(expectedNestedJson);
});
