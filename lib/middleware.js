const package = require('../package');

// set Handlebars layout to dev
exports.developer = (req, res, next) => {
  res.locals.layout = 'dev';
  next();
};

// generic 404 error handler
exports.error404 = (req, res, next) => { // eslint-disable-line
  res.render('error', {
    status: 404,
    error: 'Not found'
  });
};

// generic 500 error handler
exports.error500 = (err, req, res, next) => { // eslint-disable-line
  res.render('error', {
    status: 500,
    error: 'Server error',
    details: `Internal server error. Please consider opening an issue on GitHub: ${package.bugs}`
  });
};

// Handlebars options
exports.hbsOptions = {
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    // don't use arrow functions here - need to retain value of `this`
    section: function section (name, opts) {
      if (!this.sections) { this.sections = {}; }
      this.sections[name] = opts.fn(this);
      return null;
    }
  }
};

// inject global variables for Handlebars templates
exports.locals = (req, res, next) => {
  'use strict';
  let domain = process.env.DOMAIN;
  if (domain === 'localhost') { domain += `:${process.env.PORT}`; }
  res.locals.cdn = 'http://digitallinguistics.blob.core.windows.net';
  res.locals.baseUrl = `//${domain}`;
  res.locals.domain = domain;
  next();
};

// URL logging for debugging
exports.logger = (req, res, next) => {
  console.log(`Requested URL: ${req.method}: ${req.originalUrl}`);
  next();
};
