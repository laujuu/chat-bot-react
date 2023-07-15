const express = require('express');
const errorManager = require('../middlewares/errorManager');
const routes = require('../routes');

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorManager)

app.get('/hithere', (_req, res) => {
    res.send({'Hello': 'there'});
});

module.exports = app;