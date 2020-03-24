import winston from 'winston';

import config from '../config';

const loggerInstance = winston.createLogger({
  level: config.LOGS_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
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
