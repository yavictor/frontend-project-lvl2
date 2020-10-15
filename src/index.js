import _ from 'lodash';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

const getData = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) =>  path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = fs.readFileSync(getFixturePath(filename), 'utf-8');
  const readExtension = path.extname(filename);
  return [readFile, readExtension];
};

export default (firstConfig, secondConfig) => {
  //console.log('first & second configs', firstConfig, secondConfig);
  //console.log('getData(firstConfig)', getData(firstConfig));
  //const getData = [getData(firstConfig), getData(secondConfig)]
  const firstObject = parser(getData(firstConfig));
  const secondObject = parser(getData(secondConfig));
  //console.log('firstObject', firstObject, 'secondObject', secondObject);
  const result = ['{'];
  const mergedKeys = [...Object.keys(firstObject), ...Object.keys(secondObject)];
  //console.log('rest merge ', mergedKeys);
  //console.log('firstObject', firstObject, 'secondObject', secondObject);
  
  const render = (item) => {
    //console.log('render item: ', item);
    //console.log('_.has(firstObject, item)', _.has(firstObject, item), '_.has(secondObject, item)', _.has(secondObject, item));
    //console.log('firstObject[item]', firstObject[item], 'secondObject[item]', secondObject[item], 'firstObject[item] === secondObject[item]', firstObject[item] === secondObject[item])
    if (_.has(firstObject, item) && _.has(secondObject, item) && firstObject[item] === secondObject[item]) {
      return (`   ${item}: ${firstObject[item]}`);
    } else if (_.has(firstObject, item) && _.has(secondObject, item) && firstObject[item] !== secondObject[item]) {
      return (` - ${item}: ${firstObject[item]}
 + ${item}: ${secondObject[item]}`);
    } else if (_.has(firstObject, item) && !_.has(secondObject, item)) {
      return (` - ${item}: ${firstObject[item]}`);
    } else if (!_.has(firstObject, item) && _.has(secondObject, item)) {
      return (` + ${item}: ${secondObject[item]}`);
    } else {
      return (`+ ${item}`);
    }
  };

  const iter = (config) => config.forEach((key) => result.push(render(key)));

  iter(_.uniq(mergedKeys));
  result.push('}');
  return result.join('\n');
};
