import Joi from 'joi';
import HTTPStatus from 'http-status';
import Pelada from './model';
import { WHITELIST } from '../../config/constants';
import { filteredBody } from '../../utils';

export const validation = {
  create: {
    body: {
      name: Joi.string()
        .max(15)
        .min(3)
        .required(),
      players: Joi.array(),
    },
  },
};

export const store = async (req, res) => {
  const body = filteredBody(req.body, WHITELIST.peladas.create);
  const { _id } = req.user;
  const newPelada = {
    ...body,
    owner: _id.toString(),
  };
  try {
    const pelada = await Pelada.create(newPelada);
    const formatedPelada = {
      id: pelada._id,
      name: pelada.name,
      owner: pelada.owner,
      players: pelada.players,
      configs: {
        seasonSize: pelada.seasonSize,
        matchDuration: pelada.matchDuration,
        scoreLimit: pelada.scoreLimit,
        teamSize: pelada.teamSize,
      },
    };
    return res
      .status(HTTPStatus.CREATED)
      .json({ message: 'Pelada succefully create', pelada: formatedPelada });
  } catch (error) {
    if (error.errors.name.kind) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'Pelada name is already taken' });
    }
    return res.status(HTTPStatus.BAD_REQUEST);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const peladas = await Pelada.find({})
      .populate('players')
      .populate('owner');

    const formatedPeladas = peladas.map(pelada => ({
      id: pelada._id,
      name: pelada.name,
      owner: pelada.owner,
      players: pelada.players,
      configs: {
        seasonSize: pelada.seasonSize,
        matchDuration: pelada.matchDuration,
        scoreLimit: pelada.scoreLimit,
        teamSize: pelada.teamSize,
      },
    }));
    return res.status(HTTPStatus.CREATED).json({ peladas: formatedPeladas });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};

export const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const peladas = await Pelada.findOne({ _id: id })
      .populate('players')
      .populate('owner');

    const formatedPelada = {
      id: peladas._id,
      name: peladas.name,
      owner: peladas.owner,
      players: peladas.players,
      configs: {
        seasonSize: peladas.seasonSize,
        matchDuration: peladas.matchDuration,
        scoreLimit: peladas.scoreLimit,
        teamSize: peladas.teamSize,
      },
    };
    return res.status(HTTPStatus.CREATED).json({ pelada: formatedPelada });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const pelada = await Pelada.findById({ _id: id });
      if (!pelada) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ message: 'Pelada not found.', status: false });
      }
      if (req.user._id.toString() !== pelada.owner.toString()) {
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ message: HTTPStatus['401_NAME'], status: false });
      }
      await pelada.remove();
      return res
        .status(HTTPStatus.OK)
        .json({ message: 'Pelada successfully deleted', status: true });
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'Pelada not found' });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};
