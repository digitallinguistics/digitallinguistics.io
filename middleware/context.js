/**
 * Middleware to inject local variables into templates
 */

const injectLocals = locals => (context, next) => {
  Object.assign(context.state, locals);
  return next();
};

module.exports = injectLocals;
