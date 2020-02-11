#!/usr/bin/env node


import program from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <firstConfig> <secondConfig>')
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)));

program.parse(process.argv);
