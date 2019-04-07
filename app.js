/**
 * App setup and configuration
 */

const Koa    = require(`koa`);
const router = require(`./views/router`);

const {
  getGlobals,
  startServer,
} = require(`./lib`);

const {
  errors,
  handlebars,
  helmet,
  locals,
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
app.use(locals);     // inject local variables
app.use(router);     // mount routes

void async function start() {
  app.context.globals = await getGlobals();
  startServer(app);
}();
