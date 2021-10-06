import yaml from 'js-yaml';
import ini from 'ini';

// eslint-disable-next-line consistent-return
export default (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }
  if (format === '.ini') {
    return ini.parse(data);
  }
  return new Error(`Unsupported format: ${format}`);
};
