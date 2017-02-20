const meta = require('../package.json');

const about = (req, res) => res.render('about');

const home = (req, res) => res.render('home');

const notFound = (req, res) => res.render('error', {
  details: `The page ${req.originalUrl} could not be found.`,
  error:   'Not Found',
  status:  404,
});

const serverError = (err, req, res) => res.render('error', {
  details: `There was an unknown error on the server. If the issue continues, please open an issue at our <a href="${meta.issues}" rel='noopener noreferrer'>issues page</a>.`,
  error:   'Server Error',
  status:  500,
});

module.exports = {
  about,
  home,
  notFound,
  serverError,
};
