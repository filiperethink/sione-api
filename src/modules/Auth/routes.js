import { Router } from 'express';
import validate from 'express-validation';
import * as AuthController from './controller';

const routes = new Router();

routes.post('/auth/login', validate(AuthController.validation.login), AuthController.login);

export default routes;
