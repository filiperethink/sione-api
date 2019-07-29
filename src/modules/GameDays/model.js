/* eslint-disable import/no-mutable-exports */
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import moment from 'moment';

moment.locale('pt');

const GamedaySchema = new Schema(
  {
    pelada_id: {
      type: Schema.Types.ObjectId,
      ref: 'Pelada',
      required: true,
    },
    date: {
      type: Schema.Types.String,
      required: true,
      default: moment()
        .add(7, 'days')
        .format('L'),
    },
    hour: {
      type: Schema.Types.String,
      required: true,
      default: moment().format('LT'),
    },
    presentPlayers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    totalGols: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    totalAssists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    matches: {
      type: Schema.Types.Array,
    },
  },
  { timestamps: true },
);

GamedaySchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

let Gameday;

try {
  Gameday = mongoose.model('Gameday');
} catch (e) {
  Gameday = mongoose.model('Gameday', GamedaySchema);
}

export default Gameday;
