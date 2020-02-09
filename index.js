import _ from 'lodash';
import fs from 'fs';

export default (firstJson, secondJson) => {
    const firstObject = JSON.parse(fs.readFileSync(firstJson, 'utf-8'));
    const secondObject = JSON.parse(fs.readFileSync(secondJson, 'utf-8'));
    const result = ['{'];
    for (let key of  Object.keys({ ...firstJson, ...secondJson })) {
        if (_.has(firstJson, key) && _.has(secondJson, key) && firstJson[`${key}`] === secondJson[`${key}`]) {
            result.push(`  ${key}: ${firstJson[`${key}`]}`);
        } else if (_.has(firstJson, key) && _.has(secondJson, key) && firstJson[`${key}`] !== secondJson[`${key}`]) {
            result.push(`+ ${key}: ${firstJson[`${key}`]}`);
            result.push(`- ${key}: ${secondJson[`${key}`]}`);
        } else if (_.has(firstJson, key) && !_.has(secondJson, key)) {
            result.push(`- ${key}: ${firstJson[`${key}`]}`);
        } else if (!_.has(firstJson, key) && _.has(secondJson, key)) {
            result.push(`+ ${key}: ${secondJson[`${key}`]}`);
        }
    };
    result.push('}');
    return result;
};
