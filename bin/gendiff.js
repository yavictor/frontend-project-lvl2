#!/usr/bin/env node

import program from 'commander';
//import fs from 'fs';
import genDiff from '../src/index.js';
//import path from 'path';
//import parser from '../src/parsers.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <firstConfig> <secondConfig>')
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    //const firstObject = parser(firstConfig);
    //const secondObject = parser(secondConfig);
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);

//program.parse(process.argv);

//export default genDiff;
