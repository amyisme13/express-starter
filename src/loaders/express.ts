import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';

import config from '../config';
import logger from './logger';

export default ({ app }: { app: Application }): void => {
  app.enable('trust proxy');

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(
    morgan(
      // morgan 'combined' output with extra slash
      ':remote-addr - :remote-user [:date[clf]] \\":method :url HTTP/:http-version\\" :status :res[content-length] \\":referrer\\" \\":user-agent\\"',
      {
        stream: {
          write: (message): void => {
            logger.info(message.trim());
          },
        },
      }
    )
  );

  // Catch 404
  app.use((req, res, next) => {
    return next(new createError.NotFound());
  });

  // Error Handler
  app.use(
    (
      err: Error | HttpError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (res.headersSent) {
        next(err);
        return;
      }

      let status = 500;
      if (err instanceof HttpError) {
        status = err.status;
      }

      let message = err.message;
      if (config.NODE_ENV === 'production' && status === 500) {
        message = 'Internal server error.';
      }

      res.status(status);
      res.json({ status, message });
    }
  );
};
