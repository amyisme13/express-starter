import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  throw new Error('.env file not found.');
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  NODE_ENV: process.env.NODE_ENV,

  LOGS_LEVEL: process.env.LOGS_LEVEL || 'info',
  LOGS_MAXSIZE: parseInt(process.env.LOGS_MAXSIZE || '', 10) || 5 * 1024 * 1024, // default 5MB
};
