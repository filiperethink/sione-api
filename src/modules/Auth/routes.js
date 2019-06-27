import { Router } from 'express';
import validate from 'express-validation';
import * as AuthController from './controller';
import { authLocal } from '../../services/auth';

const routes = new Router();

routes.post(
  '/auth/login',
  validate(AuthController.validation.login),
  authLocal,
  AuthController.login,
);

export default routes;
