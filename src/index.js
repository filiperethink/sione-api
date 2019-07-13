import express from 'express';

import chalk from 'chalk';

import { middlewareConfig, CONSTANTS } from './config';
import './config/db';
import { AuthRoutes, UserRoutes, PeladaRoutes } from './modules';

const app = express();

middlewareConfig(app);

app.use('/api', [AuthRoutes, UserRoutes, PeladaRoutes]);

if (!module.parent) {
  app.listen(CONSTANTS.PORT, (err) => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        Yep this is working 🍺
        App listen on port: ${CONSTANTS.PORT} 🍕
        Env: ${CONSTANTS.NODE_ENV} 🦄
      `,
        ),
      );
    }
  });
}

export default app;
