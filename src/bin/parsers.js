import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
//import ini from 'ini';

// const format = path.extname(configPath);
// const data = fs.readSync(configPath);

// eslint-disable-next-line consistent-return
export default (configPath) => {
  const format = path.extname(configPath);
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } if (format === '.yml') {
    return yaml.safeLoad(fs.readFileSync(configPath, 'utf-8'));
  }
  // } if (format === '.ini') {
  //   return ini.parse;
  // }
};
