import { Router } from 'express';
import validate from 'express-validation';
import { authJwt } from '../../services/auth';
import * as PeladaController from './controller';

const routes = new Router();

routes.post(
  '/pelada',
  authJwt,
  validate(PeladaController.validation.create),
  PeladaController.store,
);
routes.get('/pelada/:id', authJwt, PeladaController.getById);
routes.get('/peladas', authJwt, PeladaController.getAll);
routes.delete('/pelada/:id', authJwt, PeladaController.deleteById);
export default routes;
