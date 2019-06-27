"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _expressStatusMonitor = _interopRequireDefault(require("express-status-monitor"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Configuration of the server middlewares.
 */
var isTest = _constants["default"].NODE_ENV === 'test';
var isDev = _constants["default"].NODE_ENV === 'development';

var _default = function _default(app) {
  app.use((0, _compression["default"])());
  app.use(_bodyParser["default"].json());
  app.use(_bodyParser["default"].urlencoded({
    extended: true
  }));
  app.use((0, _helmet["default"])());
  app.use((0, _cors["default"])());
  app.use((0, _expressStatusMonitor["default"])());

  if (isDev && !isTest) {
    app.use((0, _morgan["default"])('dev'));
  }
};

exports["default"] = _default;