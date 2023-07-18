const { Router } = require('express');
const dialogFlowRoutes = require('./dialogFlowRoutes');
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes')

const routes = Router();

routes.get('/', (_req, res) => {
    return res.json({
        success: true,
        message: "Api no ar"
    })
});

routes.use(dialogFlowRoutes);
routes.use(loginRoutes);
routes.use(registerRoutes);

module.exports = routes;