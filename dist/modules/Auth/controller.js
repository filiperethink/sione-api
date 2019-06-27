"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

function login(req, res, next) {
  res.send('World');
  return next();
}