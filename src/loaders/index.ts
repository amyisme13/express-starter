import { Application } from 'express';

import diLoader from './dependencyInjector';
import expressLoader from './express';
import logger from './logger';
import mongooseLoader from './mongoose';

export default async ({
  expressApp,
}: {
  expressApp: Application;
}): Promise<void> => {
  await mongooseLoader();
  logger.info('✔️ DB loaded and connected.');

  const models = [
    {
      name: 'userModel',
      model: require('../models/user').default,
    },
  ];

  await diLoader({ models });
  logger.info('✔️ Dependency Injector loaded.');

  await expressLoader({ app: expressApp });
  logger.info('✔️ Express loaded.');
};
