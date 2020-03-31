import { Router } from 'express';
import requireAll from '../utils/requireAll';

const allRoutes = requireAll('routes/.routes').asMap();
const router = new Router();

allRoutes.forEach(registerRoute => registerRoute(router));

export default router;
