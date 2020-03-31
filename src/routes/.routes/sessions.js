import auth from '../../app/middlewares/auth';
import SessionsController from '../../app/controllers/RecipientsController';
import validateSessionsStore from '../../app/validators/RecipientsStore';

export default function(routes) {
  const route = '/sessions';
  // routes.get(route, auth, index);
  routes.post(route, validateSessionsStore, SessionsController.store);
  // routes.put(route, auth, SessionsController.update);
  // routes.get(`${route}/:id`, auth, SessionsController.show);
  // routes.delete(`${route}/:id`, auth, SessionsController.destroy);
}
