const auth = require('./auth');

exports.account = (req, res) => {
  if (!req.loggedIn) { auth.authenticate(req, res); }
  else { res.render('account'); }
};

exports.developer = (req, res) => {
  res.render('developer');
};

exports.home = (req, res) => {
  res.render('home');
};

exports.login = (req, res) => {
  const checkHost = global.env === 'local' ? 'localhost' : 'digitallinguistics.org';
  if (req.hostname.includes(checkHost)) {
    auth.login(req, res);
  } else {
    res.status(403);
  }
};

exports.myapps = (req, res) => {
  if (!req.loggedIn) { auth.authenticate(req, res); }
  else { res.render('myapps'); }
};

exports.oauth = (req, res) => {
  auth.oauth(req, res);
};

exports.register = (req, res) => {
  auth.authenticate(req, res);
  if (req.method === 'GET') { res.render('register', { state: req.query.state }); }
  else if (req.method === 'POST') { auth.register(req, res); }
};

exports.test = (req, res) => {
  res.render('test', { test: 'Test' });
};
