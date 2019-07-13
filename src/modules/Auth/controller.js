import HTTPStatus from 'http-status';
import Joi from 'joi';
import User from '../User/model';
import { filteredBody } from '../../utils';
import { WHITELIST } from '../../config/constants';
import { API_MESSAGES } from '../../config/api-messages';

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

export const login = async (req, res) => {
  const body = filteredBody(req.body, WHITELIST.auth.login);
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.auth.email });
    }

    if (!user.authenticateUser(body.password)) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.auth.tryAgain });
    }
    return res.status(HTTPStatus.OK).json(user.toAuthJSON());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.auth.error });
  }
};
