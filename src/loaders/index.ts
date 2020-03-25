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

  await diLoader();
  logger.info('✔️ Dependency Injector loaded.');

  await expressLoader({ app: expressApp });
  logger.info('✔️ Express loaded.');
};
