const dlxdb = require('dlx-documentdb');

const db = dlxdb({
  id: 'dlx',
  masterKey: process.env.DOCUMENTDB
});

exports.api = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-api/');

exports.app = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-app/');

exports.apps = (req, res) => {

  const querySpec = {
    query: `SELECT * FROM dlx WHERE (dlx.type = "app" AND ARRAY_CONTAINS(dlx.permissions.owner, "${req.user.id}"))`
  };

  db.search(querySpec)
  .then(results => res.render('dev/apps', { apps: results }))
  .catch(err => res.render('error', {
    status: 500,
    error: 'Server error',
    details: `Unable to lookup apps for this user: ${JSON.stringify(err, null, 2)}` // eslint-disable-line
  }));

};

exports.blog = (req, res) => res.redirect('http://blog.digitallinguistics.org/tag/developers/');

exports.code = (req, res) => res.redirect('https://github.com/digitallinguistics/');

exports.docs = (req, res) => {
  if (req.params.doc) {
    res.redirect(`/${req.params.doc}`);
  } else {
    res.render('dev/home');
  }
};

exports.home = (req, res) => res.render('dev/home');

exports.spec = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-spec/');

exports.tools = (req, res) => res.render('dev/tools');
