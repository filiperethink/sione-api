import Joi from 'joi';
import HTTPStatus from 'http-status';
import GameDay from './model';
import { WHITELIST } from '../../config/constants';
import { filteredBody } from '../../utils';
// import { API_MESSAGES } from '../../config/api-messages';

export const validation = {
  create: {
    body: {
      pelada_id: Joi.string().required(),
      presentPlayers: Joi.array(),
      totalGols: Joi.array(),
      totalAssists: Joi.array(),
      matches: Joi.array(),
    },
  },
};

export const store = async (req, res) => {
  const body = filteredBody(req.body, WHITELIST.gameday.create);
  try {
    const newGameDay = {
      ...body,
    };
    const gameday = await GameDay.create(newGameDay);
    res.status(HTTPStatus.OK).json(gameday);
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST);
  }
};
