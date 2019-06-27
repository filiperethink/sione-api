"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */

/**
 * Configuration for the database
 */
// Remove the warning with Promise
_mongoose["default"].Promise = global.Promise; // If debug run the mongoose debug options

_mongoose["default"].set('debug', _constants["default"].MONGOOSE_DEBUG); // Connect the db with the url provide
// Connect the db with the url provide


try {
  _mongoose["default"].connect(_constants["default"].MONGO_URL, {
    useNewUrlParser: true
  });
} catch (err) {
  _mongoose["default"].createConnection(_constants["default"].MONGO_URL);
}

_mongoose["default"].connection.once('open', function () {
  return console.log('MongoDB Running');
}).on('error', function (e) {
  console.log(e);
});