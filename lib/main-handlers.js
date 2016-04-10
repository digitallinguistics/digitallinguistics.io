const mendeley = require('./mendeley');

exports.about = (req, res) => {

  var docs;

  mendeley.authenticate()
  .then(mendeley.getDocs)
  .then(result => {

    docs = result;
    res.render('main/about', { docs: docs });

  }).catch(err => {
    console.error(err, err.stack);
    res.render('error', {
      status: 500,
      error: 'Server error',
      details: 'Unable to retrieve Mendeley documents.'
    });
  });

};

exports.account = (req, res) => {
  if (req.method === 'GET') {

    res.render('main/account', { user: req.user });

  } else if (req.method === 'POST') {

  } else if (req.method === 'DELETE') {

  }
};

exports.app = (req, res) => res.redirect('https://app.digitallinguistics.org/');

exports.blog = (req, res) => res.redirect('http://blog.digitallinguistics.org/');

exports.data = (req, res) => res.redirect('https://data.digitallinguistics.org');

exports.developer = (req, res) => res.redirect('http://developer.digitallinguistics.org');

exports.home = (req, res) => res.render('main/home');

exports.learn = (req, res) => res.render('main/learn');

exports.login = (req, res) => {
  if (req.user) {
    res.render('main/home');
  } else {
    res.login('http://digitallinguistics.org/');
  }
};
