function injectLocals(context, next) {
  Object.assign(context.state, context.globals);
  return next();
}

module.exports = injectLocals;
