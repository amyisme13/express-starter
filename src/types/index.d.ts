import { User } from '../interfaces/user';
import { Model } from 'mongoose';

declare global {
  namespace Express {
    export interface Request {
      user: User;

      payload: {
        iat: number;
        sub: string;
        exp: number;
      };
    }
  }

  namespace Models {
    export type UserModel = Model<User>;
  }
}
