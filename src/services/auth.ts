import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { User, CreateUserDTO, CleanUser } from '../interfaces/user';
import createError from 'http-errors';

@Service()
export default class AuthService {
  constructor(@Inject('userModel') private userModel: Models.UserModel) {}

  public async register(
    createUserDTO: CreateUserDTO
  ): Promise<{ user: CleanUser; token: string }> {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(createUserDTO.password, {
      salt,
    });

    const userExists = await this.userModel.countDocuments({
      email: createUserDTO.email,
    });
    if (userExists) {
      throw new createError.UnprocessableEntity(
        'Account with this email already exists'
      );
    }

    const userRecord = await this.userModel.create({
      ...createUserDTO,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });

    if (!userRecord) {
      throw new createError.InternalServerError('Cannot create user');
    }

    const token = this.generateToken(userRecord);

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');

    return { user, token };
  }

  public async login(
    email: string,
    password: string
  ): Promise<{ user: CleanUser; token: string }> {
    const userRecord = await this.userModel.findOne({ email });

    if (!userRecord) {
      throw new createError.UnprocessableEntity('Invalid credentials');
    }

    const valid = await argon2.verify(userRecord.password, password);
    if (!valid) {
      throw new createError.UnprocessableEntity('Invalid credentials');
    }

    const token = this.generateToken(userRecord);

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');

    return { user, token };
  }

  private generateToken(user: User): string {
    const iat = Math.round(Date.now() / 1000);
    const expiresIn = config.JWT_EXP * 60;
    const exp = iat + expiresIn;

    return jwt.sign(
      {
        iat,
        sub: user._id,
        exp,
      },
      config.JWT_SECRET
    );
  }
}
