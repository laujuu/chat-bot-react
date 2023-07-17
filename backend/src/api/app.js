const express = require('express');
const errorManager = require('../middlewares/errorManager');
const enableCors = require('../middlewares/enableCors');
const routes = require('../routes');
const bodyParser = require('body-parser')

const app = express();
app.use(enableCors);
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

app.use(errorManager)

app.get('/hithere', (_req, res) => {
    res.send({'Hello': 'there'});
});

module.exports = app;