import Agenda from 'agenda';
import { Container } from 'typedi';
import { Db } from 'mongodb';

import agendaFactory from './agenda';
import logger from './logger';

interface DIArgument {
  models: {
    name: string;
    model: any;
  }[];

  mongoDb: Db;
}

export default ({ models, mongoDb }: DIArgument): { agenda: Agenda } => {
  try {
    models.forEach((model) => {
      Container.set(model.name, model.model);
    });
    logger.info('✔️ Models injected.');

    const agenda = agendaFactory({ mongoDb });

    Container.set('agenda', agenda);
    logger.info('✔️ agenda injected.');

    Container.set('logger', logger);
    logger.info('✔️ Logger injected.');

    // returned for jobs loader
    return { agenda };
  } catch (e) {
    logger.error('❌ Error on dependency injector loader: %o', e);
    throw e;
  }
};
