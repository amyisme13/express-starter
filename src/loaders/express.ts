import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';
import { isCelebrate, CelebrateInternalError } from 'celebrate';

import config from '../config';
import logger from './logger';
import routes from '../api';
import { UnauthorizedError } from 'express-jwt';

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

  // Load API routes
  app.use(config.API_PREFIX, routes());

  // Catch 404
  app.use((req, res, next) => {
    return next(new createError.NotFound());
  });

  // celebrate erorr handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (!isCelebrate(err)) {
      return next(err);
    }

    const { joi } = err as CelebrateInternalError;
    return next(new createError.UnprocessableEntity(joi.message));
  });

  // express-jwt error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnauthorizedError) {
      return next(new createError.Unauthorized());
    }

    next(err);
  });

  // Error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
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
    res.json({
      status,
      message,
    });
  });
};
