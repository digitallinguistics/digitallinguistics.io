const package = require('../package.json');

exports.about = (req, res) => res.render('main/about');

exports.account = (req, res) => res.render('main/account');

exports.app = (req, res) => res.redirect('https://app.digitallinguistics.org/');

exports.blog = (req, res) => res.redirect('http://blog.digitallinguistics.org/');

exports.data = (req, res) => res.redirect('https://data.digitallinguistics.org');

exports.developer = (req, res) => res.redirect('http://developer.digitallinguistics.org');

exports.home = (req, res) => res.render('main/home');

exports.login = (req, res) => {
  if (req.user) {
    res.render('main/home');
  } else {
    res.login('http://digitallinguistics.org/');
  }
};
