import { Router } from 'express';
import validate from 'express-validation';
import * as UserController from './controller';

const routes = new Router();

routes.post('/user', validate(UserController.validation.create), UserController.store);

export default routes;
