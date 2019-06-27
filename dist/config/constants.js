"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require('dotenv').config();

var _default = {
  MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGOOSE_DEBUG: process.env.MONGOOSE_DEBUG,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
};
exports["default"] = _default;