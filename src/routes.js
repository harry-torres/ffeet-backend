import { Router } from 'express';
import requireAll from './utils/requireAll';
import authenticator from './app/middlewares/auth';

const validators = requireAll('validators').asMap();
const controllers = requireAll('controllers').asMap();

const routes = new Router();

controllers.forEach((controller, name) => {
  const entity = name.replace('Controller', '');
  const route = `/${entity.toLowerCase()}`;
  const bypass = async (req, res, next) => next();
  const { index, show, store, update, destroy } = controller;
  const idxValidator = validators.get(entity.concat('Index')) || bypass;
  const showValidator = validators.get(entity.concat('Show')) || bypass;
  const delValidator = validators.get(entity.concat('Delete')) || bypass;
  const storeValidator = validators.get(entity.concat('Store')) || bypass;
  const updateValidator = validators.get(entity.concat('Update')) || bypass;
  const auth = store && store.noAuth ? bypass : authenticator;
  if (index) routes.get(route, auth, idxValidator, index);
  if (store) routes.post(route, auth, storeValidator, store);
  if (update) routes.put(route, auth, updateValidator, update);
  if (show) routes.get(`${route}/:id`, auth, showValidator, show);
  if (destroy) routes.delete(`${route}/:id`, auth, delValidator, destroy);
});

export default routes;
