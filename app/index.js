/**
 * App setup and configuration
 */

const Koa    = require(`koa`);
const meta   = require(`../package.json`);
const router = require(`./router`);

const { env, port } = require(`./config`);

const {
  errors,
  helmet,
  logger,
  serve,
  vary,
} = require(`./middleware`);

// Initialize Koa
const app = new Koa();

// Settings
app.proxy = true;   // trust the Azure proxy

// Middleware
app.use(serve);  // serve static files
app.use(logger); // log requests to console
app.use(errors); // handle errors
app.use(helmet); // set security settings
app.use(vary);   // set Vary header

// Routing
app.use(router);

// Start server
app.listen(port, () => console.info(`Server started. Press Ctrl+C to terminate.
  Project: ${meta.name}
  Port:    ${port}
  Time:    ${new Date}
  Node:    ${process.version}
  Env:     ${env}`));
