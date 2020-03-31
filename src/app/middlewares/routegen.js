// import requireAll from '../../utils/requireAll';

// const controllerMethods = new Map([
//   ['GET', 'Show'],
//   ['POST', 'Store'],
//   ['PUT', 'Update'],
//   ['DELETE', 'Delete'],
// ]);
// const validators = requireAll('validators').asMap();

function uppercaseFirstLetter(pathname) {
  return pathname.charAt(0).toUpperCase() + pathname.slice(1);
}
export default async (req, res, next) => {
  const pathname = req.url.split('/')[1];
  if (pathname) {
    const entityName = uppercaseFirstLetter(pathname);
    req.entityName = entityName;
  }
  return next();
};

/*
// TODO: https://javascript.info/regexp-groups
 let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // first alert: 30.10.2019
  // second: 01.01.2020
}
 */
