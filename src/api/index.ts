import { Router } from 'express';

import auth from './routes/auth';

// guaranteed to get dependencies
export default (): Router => {
  const app = Router();

  auth(app);

  return app;
};
