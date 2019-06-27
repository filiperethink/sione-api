/* eslint-disable no-console */

/**
 * Configuration for the database
 */

import mongoose from 'mongoose';

import CONSTANTS from './constants';

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', CONSTANTS.MONGOOSE_DEBUG);
mongoose.set('useCreateIndex', true);
// Connect the db with the url provide
// Connect the db with the url provide
try {
  mongoose.connect(CONSTANTS.MONGO_URL, { useNewUrlParser: true });
} catch (err) {
  mongoose.createConnection(CONSTANTS.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', (e) => {
    console.log(e);
  });
