/**
 * Middleware to inject local variables into templates
 */

const meta = require(`../../package.json`);

async function injectLocals(context, next) {

  context.state.cdn  = `https://cdn.digitallinguistics.io`;
  context.state.meta = meta;

  await next();

}

module.exports = injectLocals;
