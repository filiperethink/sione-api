import { Router } from 'express';
import validate from 'express-validation';
import { authJwt } from '../../services/auth';
import * as UserController from './controller';

const routes = new Router();

routes.get('/users', authJwt, UserController.getAll);
routes.get('/users/:id', authJwt, UserController.getUserById);
routes.post('/users', validate(UserController.validation.create), UserController.store);
routes.put(
  '/users/:id',
  authJwt,
  validate(UserController.validation.update),
  UserController.update,
);
routes.delete('/users/:id', authJwt, UserController.deleteUser);

export default routes;
