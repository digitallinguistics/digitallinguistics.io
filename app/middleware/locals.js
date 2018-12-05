/**
 * Middleware to inject local variables into templates
 */

const { cdn } = require(`../config`);
const meta    = require(`../../package.json`);

async function injectLocals(context, next) {

  context.state.cdn  = cdn;
  context.state.meta = meta;

  await next();

}

module.exports = injectLocals;
