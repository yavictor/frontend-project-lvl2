import _ from 'lodash';
import fs from 'fs';

export default (firstConfig, secondConfig) => {
  const firstObject = JSON.parse(fs.readFileSync(firstConfig, 'utf-8'));
  const secondObject = JSON.parse(fs.readFileSync(secondConfig, 'utf-8'));
  const result = ['{'];
  const mergedObject = { ...firstObject, ...secondObject };
  Object.keys(mergedObject).map(key => {
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
  return result;
};
