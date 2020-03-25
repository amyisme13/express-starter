import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';

import AuthService from '../../services/auth';
import { CreateUserDTO } from '../../interfaces/user';

const router = Router();

export default (app: Router): void => {
  app.use('/auth', router);

  router.post(
    '/register',

    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: false }).required(),
        password: Joi.string().min(6).max(100).required(),
      }),
    }),

    async (req, res, next) => {
      const logger = Container.get('logger') as Logger;

      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.register(
          req.body as CreateUserDTO
        );

        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );
};