/**
 * App setup and configuration
 */

const Koa  = require(`koa`);
const meta = require(`../package.json`);

const { env, port } = require(`../config`);

const { errors } = require(`./middleware`);

// Initialize Koa app
const app = new Koa();

// Middleware
app.use(errors);

app.listen(port, () => console.info(`Server started. Press Ctrl+C to terminate.
  Project: ${meta.name}
  Port:    ${port}
  Time:    ${new Date}
  Node:    ${process.version}
  Env:     ${env}`));
