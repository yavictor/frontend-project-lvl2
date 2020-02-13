import _ from 'lodash';
import fs from 'fs';

export default (firstObject, secondObject) => {
  const result = ['{'];
  const mergedObject = { ...firstObject, ...secondObject };
  Object.keys(mergedObject).forEach((key) => {
    if (_.has(firstObject, key) && _.has(secondObject, key) && firstObject[`${key}`] === secondObject[`${key}`]) {
      result.push(`  ${key}: ${firstObject[`${key}`]}`);
    } else if (_.has(firstObject, key) && _.has(secondObject, key) && firstObject[`${key}`] !== secondObject[`${key}`]) {
      result.push(`+ ${key}: ${firstObject[`${key}`]}`);
      result.push(`- ${key}: ${secondObject[`${key}`]}`);
    } else if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      result.push(`- ${key}: ${firstObject[`${key}`]}`);
    } else if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      result.push(`+ ${key}: ${secondObject[`${key}`]}`);
    }
  });
  result.push('}');
  return result.join('\n');
};
