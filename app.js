// Node modules
require('./lib/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const http = require('http');
const middleware = require('./lib/middleware');
const path = require('path');
const router = require('./lib/router');
const users = require('./lib/users');
const vhost = require('vhost');

/* eslint-disable new-cap */
const app = express(); // initialize main Express app
const dev = express.Router(); // create the router for the `development.digitallinguistics.org` subdomain
const handlebars = expressHandlebars.create(middleware.hbsOptions); // initialize Handlebars

// app settings
app.disable('x-powered-by'); // hide server information in the response
app.enable('trust proxy'); // trust the Azure proxy server
app.engine('.hbs', handlebars.engine); // declare Handlebars engine
app.set('port', process.env.PORT); // set port for the app (3000 on localhost)
app.set('view engine', '.hbs'); // use Handlebars for templating

// middleware
app.use(express.static(path.join(__dirname, '/public'))); // routing for static files
app.use(bodyParser.urlencoded({ extended: false })); // parse form data in the request body
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie handling
app.use(middleware.logger); // URL logging for debugging
app.use(middleware.locals); // inject local variables for Handlebars templates
app.use(users); // user management
app.use(vhost(`developer.${process.env.DOMAIN}`, dev)); // bind the `developer` subdomain to the dev router
dev.use(middleware.developer); // set Handlebars layout to `dev`

// routing
router.main(app);
router.developer(dev);
if (process.env.NODE_ENV === 'localhost') {
  router.test(app);
}

// catch-all error handlers
app.use(middleware.error404);
app.use(middleware.error500);

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
