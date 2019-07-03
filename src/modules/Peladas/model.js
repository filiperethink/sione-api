/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// import CONSTANTS from '../../config/constants';

const PeladaSchema = new Schema(
  {
    name: {
      type: String,
      max: [15, 'Max character is 15'],
      min: [3, 'Min character is 3'],
      unique: [true, 'Name need to be Unique!'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seasonSize: {
      type: Schema.Types.Number,
      default: 8,
      required: true,
    },
    matchDuration: {
      type: Schema.Types.Number,
      default: 7,
      required: true,
    },
    scoreLimit: {
      type: Schema.Types.Number,
      default: 2,
      required: true,
    },
    teamSize: {
      type: Schema.Types.Number,
      default: 5,
      required: true,
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

PeladaSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

let Pelada;

try {
  Pelada = mongoose.model('Pelada');
} catch (e) {
  Pelada = mongoose.model('Pelada', PeladaSchema);
}

export default Pelada;
