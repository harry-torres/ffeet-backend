// dinamically imports all files in a given dir
import fs from 'fs';
import path from 'path';

const srcPath = path.join(__dirname, '..');

function requireAllAsArray(dirPath) {
  return fs.readdirSync(dirPath).map(file => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(path.join(dirPath, file)).default;
  });
}

function requireAllAsMap(dirPath) {
  const map = new Map();
  fs.readdirSync(dirPath)
    .filter(file => file.split('.')[1] === 'js')
    .forEach(file => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      map.set(file.split('.')[0], require(path.join(dirPath, file)).default);
    });
  return map;
}

function requireRouteFrom(file) {
  return file.toLowerCase().replace('controller.js', '');
}

export function requireAllRoutesFrom(controllers) {
  return Array.from(controllers.getKeys()).map(cont => cont.split());
}

export function requireAllWithRoutes(dirPath) {
  const map = new Map();
  fs.readdirSync(dirPath).forEach(file => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    map.set(requireRouteFrom(file), require(path.join(dirPath, file)).default);
  });
  return map;
}

export default function requireAll(dir) {
  const dirPath = path.join(srcPath, dir);
  const asArray = () => requireAllAsArray(dirPath);
  const asMap = () => requireAllAsMap(dirPath);
  const withRoutes = () => requireAllWithRoutes(dirPath);
  return { asArray, asMap, withRoutes };
}
