/**
 * Load environment-specific config settings
 */

process.env.NODE_ENV = process.env.NODE_ENV || `localhost`;

const settings = require(`./${process.env.NODE_ENV}`);

Object.assign(process.env, settings);

module.exports = {
  cdn:           process.env.CDN,
  development:   process.env.NODE_ENV === `development`,
  env:           process.env.NODE_ENV,
  localhost:     process.env.NODE_ENV === `localhost`,
  logAppErrors:  process.env.LOG_APP_ERRORS === `true` || process.env.LOG_APP_ERRORS === true,
  logRequests:   process.env.LOG_REQUESTS === `true` || process.env.LOG_REQUESTS === true,
  logUserErrors: process.env.LOG_USER_ERRORS === `true` || process.env.LOG_USER_ERRORS === true,
  port:          process.env.PORT,
  production:    process.env.NODE_ENV === `production`,
};
