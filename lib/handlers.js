const api = require('./api');
const auth = require('./auth');
const uuid = require('uuid');

const accountReqs = [];

exports.account = (req, res) => {
  if (!req.loggedIn) { auth.authenticate(req, res); }
  else if (req.method === 'GET') {
    res.locals.state = uuid.v4();
    accountReqs.push({ state: res.locals.state, user: res.locals.user.id });
    res.render('account');
  } else if (req.method === 'POST') {
    res.locals.user.firstName = req.body.firstName;
    res.locals.user.lastName = req.body.lastName;
    res.locals.user.affiliation = req.body.affiliation;
    api.updateUser(res.locals.user)
    .then(result => {
      if (result.status === 201) {
        res.locals.user = result.data;
        res.render('account');
      } else {
        res.render('error', { status: result.status || 500, details: result.data });
      }
    })
    .catch(err => res.render('error', { status: err.status || 500, details: err.error_description || 'There was a problem updating your account. Please try again.' }));
  } else if (req.method === 'DELETE') {
    // TODO: call api.deleteUser
    res.status(204).json({ status: 204, data: 'deleting' });
  }
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
  if (req.method === 'GET') { res.render('register', { state: req.query.state }); }
  else if (req.method === 'POST') { auth.register(req, res); } };

exports.test = (req, res) => {
  res.render('test', { test: 'Test' });
};
