/**
 * Since koa-router redirects don't seem to work with external URLs, this utility is a small wrapper for using Koa's built-in redirect method instead
 */

/* eslint-disable
  no-param-reassign,
*/

const externalRedirect = url => context => {
  context.status = 301;
  context.redirect(url);
};

module.exports = externalRedirect;
