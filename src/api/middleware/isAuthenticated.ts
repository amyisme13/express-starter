import jwt from 'express-jwt';
import config from '../../config';

const isAuthenticated = jwt({
  secret: config.JWT_SECRET,
  requestProperty: 'payload',
});

export default isAuthenticated;
