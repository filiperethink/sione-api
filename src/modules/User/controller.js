import Joi from 'joi';
import HTTPStatus from 'http-status';
import User from './model';
import { WHITELIST } from '../../config/constants';
import { filteredBody } from '../../utils';

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
  update: {
    body: {
      email: Joi.string().email(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
      firstName: Joi.string()
        .min(3)
        .max(20),
      lastName: Joi.string()
        .min(3)
        .max(20),
    },
  },
};

export const store = async (req, res, next) => {
  const body = filteredBody(req.body, WHITELIST.users.create);
  try {
    const user = await User.create(body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const body = filteredBody(req.body, WHITELIST.users.update);
  const isEmpt = Object.entries(body).length === 0;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'User not found.' });
    }
    if (isEmpt) {
      return res.status(HTTPStatus.NOT_MODIFIED);
    }
    if (req.user._id.toString() !== id) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({ message: HTTPStatus['401_NAME'] });
    }

    const newPassword = user._hashPassword(body.password);
    const updatedUser = {
      ...body,
      password: newPassword,
    };

    console.log({ updatedUser });

    const upUser = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    return res.status(HTTPStatus.OK).json({ upUser });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};
