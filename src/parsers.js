import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (configPath) => {
  const data = fs.readFileSync(configPath, 'utf-8');
  const format = path.extname(configPath);
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml') {
    return yaml.safeLoad(data);
  } if (format === '.ini') {
    return ini.parse(data);
  }
};
