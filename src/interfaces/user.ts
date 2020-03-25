import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface CleanUser {
  name: User['name'];
  email: User['email'];
}

export interface CreateUserDTO {
  name: User['name'];
  email: User['email'];
  password: User['password'];
}
