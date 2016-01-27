// Node modules
require('./lib/config');
const cookieParser = require('cookie-parser');
const credentials = require('./lib/credentials');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const http = require('http');
const middleware = require('./lib/middleware');

const app = express(); // initialize Express app
const handlebars = expressHandlebars.create(middleware.hbsOptions); // initialize Handlebars

// app settings
app.disable('x-powered-by'); // hide server information in the response
app.enable('trust proxy'); // trust the Azure proxy server
app.engine('handlebars', handlebars.engine); // declare Handlebars engine
app.set('port', process.env.PORT || 3000); // set local port to 3000
app.set('view engine', 'handlebars'); // use Handlebars for templating

// middleware
app.use(middleware.logUrl); // URL logging for debugging
app.use(express.static(__dirname + '/public')); // routing for static files
app.use(cookieParser(credentials.secret)); // cooking handling

// routing
require('./lib/router')(app);

// catch-all error handlers
app.use(middleware.error404);
app.use(middleware.error500);

// start server
const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Server started. Press Ctrl+C to terminate.
    Port: ${app.get('port')}
    Time: ${new Date()}
    Node: ${process.version}
    Env: ${global.env}`);
});

// dev modules
if (global.env === 'local') {
  require('./lib/dev');
  require('./build/build');
}
