const sassMiddleware = require('node-sass-middleware');
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./app/helpers');
const routes = require('./app/routes');

const { APP_ENV } = process.env;
const { nsp, setRootPrefix, addTrailingSlash } = require('./lib/express/namespace');

const app = express();

app.set('etag', false);

app.use(sassMiddleware({
  src: path.join(__dirname, 'app', 'assets'),
  dest: path.join(__dirname, 'app', 'public'),
  response: false,
  debug: APP_ENV !== 'production',
  outputStyle: APP_ENV === 'production' ? 'compressed' : 'extended',
  indentedSyntax: APP_ENV !== 'production',
}));

app.use(setRootPrefix);

app.use(nsp('/'), express.static(path.join(__dirname, 'app', 'public')));

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(nsp('/'), routes);

app.use(addTrailingSlash);

module.exports = app;
