// dinamically imports all models in app/models
import fs from 'fs';
import path from 'path';

const modelsPath = path.join(__dirname, '..');

const models = fs
  .readdirSync(modelsPath)
  .filter(file => file.split('.')[1] === 'js')
  .map(file => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(`../${file}`).default;
  });

export default models;
