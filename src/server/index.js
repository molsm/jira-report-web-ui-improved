require('dotenv').config();
const port = process.env.SERVER_PORT || 80;

const path = require('path');
const debug = require('debug')('express:view');
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const responseMiddleware = require('./utils/response');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app', 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);

app.use(router);

app.listen(port, () => console.log('Listening on ' + port));
