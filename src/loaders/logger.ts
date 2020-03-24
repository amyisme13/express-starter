import path from 'path';
import winston from 'winston';

import config from '../config';

const appRoot = path.join(__dirname, '../../');

const loggerInstance = winston.createLogger({
  level: config.LOGS_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: path.join(appRoot, 'logs/error.log'),
      maxsize: config.LOGS_MAXSIZE,
    }),

    new winston.transports.File({
      filename: path.join(appRoot, 'logs/combined.log'),
      maxsize: config.LOGS_MAXSIZE,
    }),
  ],
});

if (config.NODE_ENV !== 'production') {
  loggerInstance.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

export default loggerInstance;
