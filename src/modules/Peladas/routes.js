import { Router } from 'express';
import validate from 'express-validation';
import { authJwt } from '../../services/auth';
import * as PeladaController from './controller';

const routes = new Router();

routes.post(
  '/peladas',
  authJwt,
  validate(PeladaController.validation.create),
  PeladaController.store,
);
routes.put(
  '/peladas/:id',
  authJwt,
  validate(PeladaController.validation.update),
  PeladaController.update,
);
routes.get('/peladas/:id', authJwt, PeladaController.getById);
routes.get('/pelada', authJwt, PeladaController.getPeladaByUserId);
routes.get('/peladas', authJwt, PeladaController.getAll);
routes.delete('/peladas/:id', authJwt, PeladaController.deleteById);
export default routes;
