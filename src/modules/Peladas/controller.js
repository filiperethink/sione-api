import Joi from 'joi';
import HTTPStatus from 'http-status';
import Pelada from './model';
import { WHITELIST } from '../../config/constants';
import { filteredBody, formatPeladaData } from '../../utils';
import { API_MESSAGES } from '../../config/api-messages';

export const validation = {
  create: {
    body: {
      name: Joi.string()
        .max(18)
        .min(3)
        .required(),
      players: Joi.array(),
    },
  },
  update: {
    body: {
      name: Joi.string()
        .max(18)
        .min(3)
        .error(new Error('Was REALLY expecting a string')),
      players: Joi.array(),
      seasonSize: Joi.number(),
      matchDuration: Joi.number(),
      scoreLimit: Joi.number(),
      teamSize: Joi.number(),
    },
  },
};

export const store = async (req, res) => {
  const body = filteredBody(req.body, WHITELIST.peladas.create);
  const { _id } = req.user;

  // SET OWNERID
  const newPelada = {
    ...body,
    players: [...body.players, _id],
    owner_id: _id.toString(),
  };

  try {
    const pelada = await Pelada.create(newPelada);
    const formatedPelada = formatPeladaData(pelada);
    return res
      .status(HTTPStatus.CREATED)
      .json({ message: API_MESSAGES.peladas.create.success, pelada: formatedPelada });
  } catch (error) {
    if (error.errors.name.kind) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: API_MESSAGES.peladas.create.error.nameTaken });
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.error });
  }
};

export const getAll = async (req, res) => {
  try {
    const peladas = await Pelada.find({}).populate('players');
    const formatedPeladas = peladas.map(pelada => formatPeladaData(pelada));
    return res
      .status(HTTPStatus.OK)
      .json({ message: API_MESSAGES.peladas.getAll.success, peladas: formatedPeladas });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.peladas.getAll.error });
  }
};

// GET PELADA BY PELADA_ID
export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const pelada = await Pelada.findOne({ _id: id })
      .populate('players')
      .populate('owner');

    if (!pelada) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
    }
    const formatedPelada = formatPeladaData(pelada);
    return res
      .status(HTTPStatus.OK)
      .json({ message: API_MESSAGES.peladas.getById.success, pelada: formatedPelada });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.peladas.getById.error });
  }
};

// GET PELADA BY USER_ID
export const getPeladaByUserId = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const peladas = await Pelada.find({ owner_id: _id }).populate('players');
    const formatedPeladas = peladas.map(pelada => formatPeladaData(pelada));
    return res.status(HTTPStatus.CREATED).json({ pelada: formatedPeladas });
  } catch (error) {
    error.status = HTTPStatus.BAD_REQUEST;
    return next(error);
  }
};

// UPDATE PELADA BY PELADA_ID
export const update = async (req, res) => {
  const { id } = req.params;
  const body = filteredBody(req.body, WHITELIST.peladas.update);
  const isEmpt = Object.entries(body).length === 0;
  try {
    const pelada = await Pelada.find({ _id: id }).where({ owner_id: req.user._id });
    if (!pelada) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
    }
    if (isEmpt) {
      return res
        .status(HTTPStatus.NOT_MODIFIED)
        .json({ message: API_MESSAGES.generic.nothingToUpdate });
    }
    const updatedPelada = {
      ...body,
    };

    const upPelada = await Pelada.findByIdAndUpdate(id, updatedPelada, { new: true }).populate(
      'players',
    );

    const formatedPelada = formatPeladaData(upPelada);

    return res
      .status(HTTPStatus.OK)
      .json({ message: API_MESSAGES.peladas.update.success, pelada: formatedPelada });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.peladas.update.error });
  }
};
// DELETE PELADA BY ID
export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const pelada = await Pelada.findById({ _id: id });
      if (!pelada) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
      }
      if (req.user._id.toString() !== pelada.owner_id.toString()) {
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ message: API_MESSAGES.auth.unAuthorized });
      }
      await pelada.remove();
      return res.status(HTTPStatus.OK).json({ message: API_MESSAGES.peladas.remove.success });
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.generic.notFound });
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: API_MESSAGES.peladas.remove.error });
  }
};
