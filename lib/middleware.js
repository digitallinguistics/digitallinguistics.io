/* eslint-disable
  no-console,
  no-param-reassign
*/

const meta = require('../package.json');

const middleware = (req, res, next) => {
  console.log(`Requested URL: ${req.originalUrl}`);      // log the requested URL for debugging
  res.locals.cdn  = `https://cdn.digitallinguistics.io`; // make DLx CDN URI available to views
  res.locals.meta = meta;                                // make project metadata available to views
  next();
};

module.exports = middleware;
