'use strict';

const express = require('express');
const router = require('./router');
const defaultErrorHandler = require('./middleware/default-error-handler');

const app = express();
app.set('view engine', 'ejs');

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(defaultErrorHandler);

const port = 3000;
app.listen(port, () => {
  console.log('Express server started on port 3000');
});
