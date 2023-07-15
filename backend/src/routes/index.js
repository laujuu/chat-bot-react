const { Router } = require('express');
const dialogFlowRoutes = require('./dialogFlowRoutes');

const routes = Router();

routes.get('/', (_req, res) => {
    return res.json({
        success: true,
        message: "Api no ar"
    })
});

routes.use(dialogFlowRoutes);

module.exports = routes;