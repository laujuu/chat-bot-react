const express = require('express');
const session = require('express-session');
const errorManager = require('../middlewares/errorManager');
const enableCors = require('../middlewares/enableCors');
const routes = require('../routes');
const bodyParser = require('body-parser')

const config = require('../config/keys')
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
  }));

app.use(enableCors);
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

app.use(errorManager)

app.get('/hithere', (_req, res) => {
    res.send({'Hello': 'there'});
});


module.exports = app;