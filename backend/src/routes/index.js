const { Router } = require('express');
const routeExemple = require('./routeExemple');

const routes = Router();

routes.use(routeExemple);

module.exports = routes;