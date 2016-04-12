exports.api = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-api');

exports.app = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-app');

exports.apps = (req, res) => res.render('dev/apps');

exports.blog = (req, res) => res.render('dev/blog');

exports.code = (req, res) => res.render('dev/code');

exports.home = (req, res) => res.render('dev/home');

exports.spec = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-spec/');

exports.tools = (req, res) => res.render('dev/tools');
