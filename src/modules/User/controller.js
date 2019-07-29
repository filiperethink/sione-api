import Joi from 'joi';
import HTTPStatus from 'http-status';
import User from './model';
import { WHITELIST } from '../../config/constants';
import { filteredBody } from '../../utils';
import { API_MESSAGES } from '../../config/api-messages';

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
      admin_pelada: Joi.array(),
      pro: Joi.boolean().default(false),
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
      admin_pelada: Joi.array(),
      pro: Joi.boolean().default(false),
    },
  },
};

// GET ALL USERS
export const getAll = async (req, res) => {
  try {
    const users = await User.find({}).populate();
    return res.status(HTTPStatus.OK).json({ message: API_MESSAGES.users.getAll.success, users });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.users.getAll.error });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.find({ _id: id });
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
    }
    return res.status(HTTPStatus.OK).json({ message: API_MESSAGES.users.getById.success, user });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.users.getById.error });
  }
};

// CREATE USER
export const store = async (req, res) => {
  console.log('BODY', req.body);

  const body = filteredBody(req.body, WHITELIST.users.create);
  try {
    await User.create(body);
    return res.status(HTTPStatus.CREATED).json({ success: true });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.users.create.error });
  }
};

// UPDATE USER
export const update = async (req, res) => {
  const { id } = req.params;
  const body = filteredBody(req.body, WHITELIST.users.update);
  const isEmpt = Object.entries(body).length === 0;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
    }
    if (isEmpt) {
      return res
        .status(HTTPStatus.NOT_MODIFIED)
        .json({ message: API_MESSAGES.generic.nothingToUpdate });
    }
    if (req.user._id.toString() !== id) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({ message: API_MESSAGES.auth.unAuthorized });
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
    return res
      .status(HTTPStatus.OK)
      .json({ message: API_MESSAGES.users.update.success, user: upUser });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.users.update.error });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById({ _id: id });
      if (!user) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
      }
      if (req.user._id.toString() !== id) {
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ message: API_MESSAGES.auth.unAuthorized });
      }
      await user.remove({ session: false });
      return res.status(HTTPStatus.OK).json({ message: API_MESSAGES.users.remove.success });
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.users.remove.error });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.users.remove.error });
  }
};
