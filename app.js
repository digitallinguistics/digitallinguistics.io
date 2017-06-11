const config = require('./lib/config');

const express    = require('express');
const hbs        = require('./lib/handlebars');
const helmet     = require('helmet');
const http       = require('http');
const meta       = require('./package.json');
const middleware = require('./lib/middleware');
// const route      = require('./lib/router');

// initialize Express
const app = express();

// app settings
app.enable(`trust proxy`);           // trust the Azure proxy server
// app.engine(hbs.extname, hbs.engine); // declare Handlebars engine
app.set(`port`, config.port);        // set port for the app (3000 on localhost)
// app.set(`view engine`, hbs.extname); // use Handlebars for templating

// middleware
// app.use(helmet());                   // basic security features
// app.use(express.static(`public`));   // routing for static files
// app.use(middleware);                 // custom middleware

// URL routing
// route(app);

// create server
// const server = http.createServer(app);
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': `text/plain` });
  res.end('Hello world!');
});

// start server listening
server.listen(config.port, () => {
  console.log(`\nServer started. Press Ctrl+C to terminate.
  Project:  ${meta.name}
  Port:     ${config.port}
  Time:     ${new Date}
  Node:     ${process.version}
  Env:      ${config.env}`);
});
