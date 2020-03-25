import { Container } from 'typedi';
import { RequestHandler } from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';

const attachAuthUser: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.payload.sub)) {
      throw new createError.Unauthorized();
    }

    const userModel = Container.get('userModel') as Models.UserModel;

    const userRecord = await userModel.findById(req.payload.sub);
    if (!userRecord) {
      throw new createError.Unauthorized();
    }

    req.user = userRecord;
    return next();
  } catch (e) {
    return next(e);
  }
};

export default attachAuthUser;
