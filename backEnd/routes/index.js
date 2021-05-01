const express = require(`express`);
const api = express.Router();

const routes = [`users`];
routes.forEach((route) => require(`./${route}`)(api));

module.exports = api;
