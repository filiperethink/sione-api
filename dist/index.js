"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _chalk = _interopRequireDefault(require("chalk"));

var _config = require("./config");

require("./config/db");

var _modules = require("./modules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _config.middlewareConfig)(app);
app.use('/api', [_modules.AuthRoutes]);

if (!module.parent) {
  console.log({
    CONSTANTS: _config.CONSTANTS
  });
  app.listen(_config.CONSTANTS.PORT, function (err) {
    if (err) {
      console.log(_chalk["default"].red('Cannot run!'));
    } else {
      console.log(_chalk["default"].green.bold("\n        Yep this is working \uD83C\uDF7A\n        App listen on port: ".concat(_config.CONSTANTS.PORT, " \uD83C\uDF55\n        Env: ").concat(_config.CONSTANTS.NODE_ENV, " \uD83E\uDD84\n      ")));
    }
  });
}

var _default = app;
exports["default"] = _default;