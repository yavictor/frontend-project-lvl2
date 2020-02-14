import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
//import ini from 'ini';

// const format = path.extname(configPath);
const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');

// eslint-disable-next-line consistent-return
export default (configPath) => {
  const format = path.extname(configPath);
  if (format === '.json') {
    return JSON.parse(getData(configPath));
  } if (format === '.yml') {
    return yaml.safeLoad(getData(configPath));
  }
  // } if (format === '.ini') {
  //   return ini.parse;
  // }
};
