const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const routes = require('./routes');
const { handleError, ErrorHandler } = require('./utils/helpers/error');

const app = express();
const port = 3001;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res, next) => next(new ErrorHandler(404, 'Not found')));

/* eslint-disable-next-line */
app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => console.log(`App is listening on port: ${port}`));

module.exports = app;
