import renderJson from './json.js';
import renderStylish from './stylish.js';
import renderPlain from './plain.js';

export default (data, format) => {
  switch (format) {
    case 'json':
      return renderJson(data);
    case 'stylish':
      return renderStylish(data);
    case 'plain':
      return renderPlain(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
