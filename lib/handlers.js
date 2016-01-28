const auth = require('./auth');

exports.home = (req, res) => {
  res.render('home');
};

exports.login = (req, res) => {
  auth.login(req, res);
};

exports.test = (req, res) => {
  res.render('test', { test: 'Test' });
};

exports.register = (req, res) => {
  res.render('register');
};
