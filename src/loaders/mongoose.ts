import mongoose from 'mongoose';

import config from '../config';

export default (): Promise<typeof mongoose> => {
  return mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};
