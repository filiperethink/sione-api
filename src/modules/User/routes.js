import { Router } from 'express';
import validate from 'express-validation';
import { authJwt } from '../../services/auth';
import * as UserController from './controller';

const routes = new Router();

routes.get('/users', authJwt, UserController.getAll);
routes.post('/user', validate(UserController.validation.create), UserController.store);
routes.put('/user/:id', authJwt, validate(UserController.validation.update), UserController.update);
routes.delete('/user/:id', authJwt, UserController.deleteUser);

export default routes;
