const config = require('./config.js');

exports.error404 = (req, res) => {
  res.status(404);
  res.render('error', { status: 404, details: 'Not found.' });
};

exports.error500 = (err, req, res, next) => {
  res.status(500);
  res.render('error', { status: 500, details: `Internal server error. Please open an issue on GitHub: <a>${config.bugs}</a>` });
};

exports.hbsOptions = {
  defaultLayout: 'main',

  helpers: {
    // don't use arrow functions here - need to retain value of `this`
    section: function (name, opts) {
      if (!this.sections) { this.sections = {}; }
      this.sections[name] = opts.fn(this);
      return null;
    }
  }
};

exports.logUrl = (req, res, next) => {
  console.log('Requested URL:', req.url);
  next();
};
