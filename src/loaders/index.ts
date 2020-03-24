import { Application } from 'express';

import expressLoader from './express';
import logger from './logger';

export default async ({
  expressApp,
}: {
  expressApp: Application;
}): Promise<void> => {
  await expressLoader({ app: expressApp });
  logger.info('✔️ Express loaded.');
};
