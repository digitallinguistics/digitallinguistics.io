// Node modules
require('./lib/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const http = require('http');
const package = require('./package');
const path = require('path');
const router = require('./lib/router');
const users = require('./lib/users');
const vhost = require('vhost');

const hbsOptions = {
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    // don't use arrow functions here - need to retain value of `this`
    section: function section (name, opts) {
      if (!this.sections) { this.sections = {}; }
      this.sections[name] = opts.fn(this);
      return null;
    }
  }
};

const app = express(); // initialize main Express app
const dev = express.Router(); /* create the router for the `development.digitallinguistics.org` subdomain */ // eslint-disable-line
const handlebars = expressHandlebars.create(hbsOptions); // initialize Handlebars

// app settings
app.disable('x-powered-by'); // hide server information in the response
app.enable('trust proxy'); // trust the Azure proxy server
app.engine('.hbs', handlebars.engine); // declare Handlebars engine
app.set('port', process.env.PORT); // set port for the app (3000 on localhost)
app.set('view engine', '.hbs'); // use Handlebars for templating

// middleware
app.use(express.static(path.join(__dirname, '/public'))); // routing for static files
app.use(bodyParser.urlencoded({ extended: false })); // parse form data in the request body
app.use(cookieParser(process.env.COOKIE_SECRET)); // cooking handling
app.use(vhost(`development.${process.env.DOMAIN}`, dev)); // bind the `development` subdomain to the dev router

// URL logging for debugging
// inject global variables for Handlebars templates
app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  res.locals.cdn = 'http://digitallinguistics.blob.core.windows.net';
  res.locals.baseUrl = `//${process.env.DOMAIN}`;
  next();
});

// user management
app.use(users);

// routing
router.main(app);
router.developer(dev);

if (process.env.NODE_ENV === 'localhost') {
  router.test(app);
}

// catch-all error handlers
app.use((req, res, next) => { // eslint-disable-line
  res.render('error', {
    status: 404,
    error: 'Not found'
  });
});

app.use((req, res, next) => { // eslint-disable-line
  res.render('error', {
    status: 500,
    error: 'Server error',
    details: `Internal server error. Please consider opening an issue on GitHub: ${package.bugs}`
  });
});

// start server
const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Server started. Press Ctrl+C to terminate.
  Project: dlx-org
  Port:    ${app.get('port')}
  Time:    ${new Date()}
  Node:    ${process.version}
  Env:     ${process.env.NODE_ENV}`);
});
