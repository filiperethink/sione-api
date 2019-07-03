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
        .required('Is Required'),
      firstName: Joi.string()
        .min(3)
        .max(20)
        .required(),
      lastName: Joi.string()
        .min(3)
        .max(20)
        .required(),
      role: Joi.string()
        .valid('admin', 'normal')
        .default('normal'),
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
      role: Joi.string().valid('admin', 'normal'),
    },
  },
};

export const getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log({ users });

    return res.status(HTTPStatus.OK).json({ users });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
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

    let updatedUser;

    if (body.password) {
      updatedUser = {
        ...body,
        password: user._hashPassword(body.password),
      };
    } else {
      updatedUser = {
        ...body,
      };
    }
    const upUser = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    return res.status(HTTPStatus.OK).json({ user: upUser });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById({ _id: id });
      if (!user) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'User not found.' });
      }
      if (req.user._id.toString() !== id) {
        return res.status(HTTPStatus.UNAUTHORIZED).json({ message: HTTPStatus['401_NAME'] });
      }
      await user.remove({ session: false });
      return res.status(HTTPStatus.OK).json({ message: 'Account successfully deleted' });
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'User not found' });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};
