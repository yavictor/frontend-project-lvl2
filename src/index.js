import _ from 'lodash';
import fs from 'fs';
import parser from './parsers.js';

export default (firstConfig, secondConfig) => {
  //console.log('first & second configs', firstConfig, secondConfig);
  const firstObject = parser(firstConfig);
  const secondObject = parser(secondConfig);
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
