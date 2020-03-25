import mongoose, { Schema } from 'mongoose';

import { User } from '../interfaces/user';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>('User', userSchema);
