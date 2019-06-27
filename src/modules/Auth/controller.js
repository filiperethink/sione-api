import HTTPStatus from 'http-status';
import Joi from 'joi';

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

export function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

  return next();
}
