const { Router } = require('express');

const routeExemple = Router();

routeExemple.get('/', (_req, res) => {
    return res.json({
        success: true,
        message: "Api no ar"
    })
});

module.exports = routeExemple;