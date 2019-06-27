"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dbConfig", {
  enumerable: true,
  get: function get() {
    return _db["default"];
  }
});
Object.defineProperty(exports, "middlewareConfig", {
  enumerable: true,
  get: function get() {
    return _mid["default"];
  }
});
Object.defineProperty(exports, "CONSTANTS", {
  enumerable: true,
  get: function get() {
    return _constants["default"];
  }
});

var _db = _interopRequireDefault(require("./db"));

var _mid = _interopRequireDefault(require("./mid"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }