/**
 * Middleware to inject local variables into templates
 */

const meta = require(`../../package.json`);

async function injectLocals(context, next) {

  context.state.meta = meta;

  await next();

}

module.exports = injectLocals;
