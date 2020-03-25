import { Application } from 'express';

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

  await expressLoader({ app: expressApp });
  logger.info('✔️ Express loaded.');
};
