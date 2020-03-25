import { User } from '../interfaces/user';
import { Model } from 'mongoose';

declare global {
  namespace Express {
    export interface Request {
      currentUser: User;
    }
  }

  namespace Models {
    export type UserModel = Model<User>;
  }
}
