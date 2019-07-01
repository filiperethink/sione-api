import { Router } from 'express';
import validate from 'express-validation';
import { authJwt } from '../../services/auth';
import * as UserController from './controller';

const routes = new Router();

routes.post('/user', validate(UserController.validation.create), UserController.store);
routes.put('/user/:id', authJwt, validate(UserController.validation.update), UserController.update);

export default routes;
