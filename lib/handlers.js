const getDocs = require('./mendeley');
const meta    = require('../package.json');

const about = (req, res) => {
  getDocs()
  .then(docs => res.render(`about`, { docs }))
  .catch(() => res.render(`about`, { docs: [] }));
};

const blog = (req, res) => {
  res.redirect(`http://blog.digitallinguistics.io/tag/general`);
};

const home = (req, res) => res.render(`home`);

const notFound = (req, res) => res.render(`error`, {
  details: `The page <code>${req.originalUrl}</code> could not be found.`,
  error:   `Not Found`,
  status:  404,
});

const serverError = (err, req, res) => res.render(`error`, {
  details: `There was an unknown error on the server. If the issue continues, please open an issue at our <a href="${meta.issues}" rel='noopener noreferrer'>issues page</a>.`,
  error:   `Server Error`,
  status:  500,
});

module.exports = {
  about,
  blog,
  home,
  notFound,
  serverError,
};
