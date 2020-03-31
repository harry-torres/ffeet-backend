import requireAll from '../../utils/requireAll';

const controllerMethods = new Map([
  ['GET', 'Show'],
  ['POST', 'Store'],
  ['PUT', 'Update'],
  ['DELETE', 'Delete'],
]);
const validators = requireAll('validators').asMap();

export default async (req, res, next) => {
  const { url, method, params } = req;

  if (url.length > 1) {
    const regex = /^\/(?<first>[a-z])(?<rest>.*)(s$|s[?|/])(?<params>.*)/;
    const result = req.url.match(regex);
    const { first, rest } = result.groups;

    // if get has not params, use index, otherwise show
    const classMethod =
      method === 'GET' && params ? 'Index' : controllerMethods.get(method);

    const validatorName = first
      .toUpperCase()
      .concat(rest)
      .concat(classMethod);
    const schema = validators.get(validatorName);
    if (schema) {
      try {
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        return res.status(400).json({
          error: 'Validation fails',
          message: err.inner,
        });
      }
    }
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
