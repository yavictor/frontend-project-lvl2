import _ from 'lodash';
import fs from 'fs';

var firstObject = {};
var secondObject = {};
let mergedObject = {};
const result = ['{'];

const render = (item) => {
  const resultRender = [];
  if (_.has(firstObject, item) && _.has(secondObject, item) && firstObject[`${item}`] === secondObject[`${item}`]) {
    resultRender.push(`  ${item}: ${firstObject[`${item}`]}`);
  } else if (_.has(firstObject, item) && _.has(secondObject, item) && firstObject[`${item}`] !== secondObject[`${item}`]) {
    resultRender.push(`+ ${item}: ${firstObject[`${item}`]}`);
    resultRender.push(`- ${item}: ${secondObject[`${item}`]}`);
  } else if (_.has(firstObject, item) && !_.has(secondObject, item)) {
    resultRender.push(`- ${item}: ${firstObject[`${item}`]}`);
  } else if (!_.has(firstObject, item) && _.has(secondObject, item)) {
    resultRender.push(`+ ${item}: ${secondObject[`${item}`]}`);
  } else {
    resultRender.push(`+ ${item}`);
  }
  return resultRender;
};

const iter = (config) => {
  console.log(config);
  console.log('Type of config', typeof config);
  if (typeof config === 'string') {
    //console.log('Type of key', typeof key, 'Instance of');
    //console.log('Key to render', key);
    result.push(render(config));
  } else {
    console.log('Object keys arr ', Object.keys(config));
    //console.log('Config common ', config.common);
    Object.keys(config).forEach((key) => {
      console.log('Object key ', key);
      console.log('Object key value ', config[`${key}`]);
      if (typeof config[`${key}`] === 'object') {
        result.push(render(key));
        iter(config[`${key}`]);
      } else {
        result.push(render(key));
      }
    });
  }
};

export default (firstConfig, secondConfig) => {
  firstObject = firstConfig;
  console.log('first', (firstObject));
  secondObject = secondConfig;
  console.log('second', secondObject);
  //const keysArray = _.uniq(_.concat(_.toPairs(firstObject), _.values(secondObject)));
  mergedObject = _.merge(firstObject, secondObject);
  //console.log('merged', mergedObject);
  //console.log('keys', keysArray);
  iter(mergedObject);
  result.push('}');
  return result.join('\n');
};
