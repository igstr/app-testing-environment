const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./src/routes/index');
const app = express();
const dotenv = require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

// Connect to db
require('./src/db/connection');

// Set template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Set express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Set application routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
if (app.get('env') !== 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ message: err.message, error: err });
  });
} else {
  // Production error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  });
}

// Listen!
const port = (process.env.PORT || 8080);
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
