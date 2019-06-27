import Joi from 'joi';
import HTTPStatus from 'http-status';
import User from './model';

export const validation = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      firstName: Joi.string()
        .min(3)
        .max(20)
        .required(),
      lastName: Joi.string()
        .min(3)
        .max(20)
        .required(),
    },
  },
};

export const store = async (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (error) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};
