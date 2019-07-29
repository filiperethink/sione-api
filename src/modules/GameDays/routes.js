import { Router } from 'express';
import validate from 'express-validation';
import { authJwt } from '../../services/auth';
import * as GameDaysController from './controller';

const routes = new Router();

routes.post(
  '/gamedays',
  authJwt,
  validate(GameDaysController.validation.create),
  GameDaysController.store,
);
export default routes;
