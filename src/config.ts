import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  throw new Error('.env file not found.');
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  NODE_ENV: process.env.NODE_ENV,
};
