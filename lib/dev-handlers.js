exports.api = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-api/');

exports.app = (req, res) => res.redirect('http://digitallinguistics.github.io/dlx-app/');

exports.apps = (req, res) => res.render('dev/apps');

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
