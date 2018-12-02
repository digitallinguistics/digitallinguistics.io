/**
 * Sets the Vary header for all incoming requests
 */

async function vary(context, next) {
  context.vary(`Upgrade-Insecure-Requests`);
  await next();
}

module.exports = vary;
