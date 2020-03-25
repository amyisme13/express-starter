import { Container } from 'typedi';
import logger from './logger';

interface DIArgument {
  models: {
    name: string;
    model: any;
  }[];
}

export default ({ models }: DIArgument): void => {
  try {
    models.forEach((model) => {
      Container.set(model.name, model.model);
    });
    logger.info('✔️ Models injected.');

    Container.set('logger', logger);
    logger.info('✔️ Logger injected.');
  } catch (e) {
    logger.error('❌ Error on dependency injector loader: %o', e);
    throw e;
  }
};
