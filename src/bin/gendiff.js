#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <firstConfig> <secondConfig>')
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const firstObject = JSON.parse(fs.readFileSync(firstConfig, 'utf-8'));
    const secondObject = JSON.parse(fs.readFileSync(secondConfig, 'utf-8'));
    console.log(genDiff(firstObject, secondObject));
  });

program.parse(process.argv);
