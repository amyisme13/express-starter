import { Container } from 'typedi';
import logger from './logger';

export default (): void => {
  try {
    Container.set('logger', logger);
  } catch (e) {
    logger.error('❌ Error on dependency injector loader: %o', e);
    throw e;
  }
};
