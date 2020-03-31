import auth from '../../app/middlewares/auth';
import RecipientsController from '../../app/controllers/RecipientsController';
import validateRecipientsStore from '../../app/validators/RecipientsStore';

export default function(routes) {
  const route = '/recipients';
  routes.get(route, auth, RecipientsController.index);
  routes.post(route, auth, validateRecipientsStore, RecipientsController.store);
  routes.put(route, auth, RecipientsController.update);
  routes.get(`${route}/:id`, auth, RecipientsController.show);
  routes.delete(`${route}/:id`, auth, RecipientsController.destroy);
}
