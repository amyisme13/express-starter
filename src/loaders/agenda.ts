import Agenda from 'agenda';
import { Db } from 'mongodb';

import config from '../config';

export default ({ mongoDb }: { mongoDb: Db }): Agenda => {
  return new Agenda({
    mongo: mongoDb,
    db: { collection: config.AGENDA_COLLECTION },
  });
};
