/**
 * App setup and configuration
 */

const { getLocals } = require(`./lib`);
const Koa           = require(`koa`);
const meta          = require(`./package.json`);
const router        = require(`./router`);

const { env, port } = require(`./config`);

const {
  context,
  errors,
  handlebars,
  helmet,
  logger,
  serve,
  vary,
} = require(`./middleware`);

// Initialize Koa
const app = new Koa();

// Settings
app.proxy = true;    // trust the Azure proxy

// Middleware
app.use(serve);      // serve static files
app.use(logger);     // log requests to console
app.use(errors);     // handle errors
app.use(helmet);     // set security settings
app.use(vary);       // set Vary header
app.use(handlebars); // use Handlebars for rendering

const startServer = () => app.listen(port, () => console.info(`Server started. Press Ctrl+C to terminate.
  Project: ${meta.name}
  Port:    ${port}
  Time:    ${new Date}
  Node:    ${process.version}
  Env:     ${env}`));

void async function start() {
  const locals = await getLocals();
  app.use(context(locals));
  app.use(router);
  startServer();
}();
