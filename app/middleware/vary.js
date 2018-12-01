/**
 * Sets the Vary header for all incoming requests
 */

module.exports = (context, next) => {
  context.vary(`Upgrade-Insecure-Requests`);
  next();
};
