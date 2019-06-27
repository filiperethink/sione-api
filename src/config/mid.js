/**
 * Configuration of the server middlewares.
 */

import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import expressStatusMonitor from 'express-status-monitor';
import passport from 'passport';
import CONSTANTS from './constants';

const isTest = CONSTANTS.NODE_ENV === 'test';
const isDev = CONSTANTS.NODE_ENV === 'development';

export default (app) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  app.use(expressStatusMonitor());
  if (isDev && !isTest) {
    app.use(morgan('dev'));
  }
};
