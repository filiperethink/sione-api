import HTTPStatus from 'http-status';
import Joi from 'joi';
import User from '../User/model';

export const validation = {
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    },
  },
};

export const login = async (req, res, next) => {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

  return next();
};
