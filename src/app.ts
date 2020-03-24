import 'reflect-metadata';

import express from 'express';

import config from './config';
import loaders from './loaders';
import logger from './loaders/logger';

// Do something here

const startServer = async (): Promise<void> => {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.PORT, (err: Error) => {
    if (err) {
      logger.error(err);
      return;
    }

    logger.info(`✈️ Server listening on port ${config.PORT}.`);
  });
};

startServer();
