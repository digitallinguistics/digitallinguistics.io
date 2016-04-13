const dlxdb = require('dlx-documentdb');
const mendeley = require('./mendeley');

const db = dlxdb({
  id: 'dlx',
  masterKey: process.env.DOCUMENTDB
});

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

    res.render('main/account');

  } else if (req.method === 'POST') {

    delete req.body.updateInfoButton;
    req.body.id = req.body.email;

    if (req.user.id === req.body.id) {

      Object.assign(req.user, req.body);

      db.upsert(req.user)
      .then(user => {

        req.user = res.locals.user = user;
        res.setCookie(user.id);
        res.render('main/account');

      }).catch(err => {

        res.render('error', {
          status: '500',
          error: 'Server error',
          details: `Error occurred while updating user: ${err}: ${err.stack}` // eslint-disable-line
        });

      });

    } else {
      res.render('error', {
        status: 500,
        error: 'Server error',
        details: 'Old email does not match the email of the signed in user.'
      });
    }


  } else if (req.method === 'DELETE') {

    db.delete(req.user.id)
    .then(result => {

      const deleteCode = 204;

      if (result.status == deleteCode) { // eslint-disable-line

        res.logout();

        res.status(deleteCode);

        res.render('error', {
          status: '',
          error: '',
          details: 'Account successfully deleted.'
        });

      } else {

        res.render('error', {
          status: 500,
          error: 'Server error',
          details: `Error while deleting user: ${result}`
        });

      }

    }).catch(err => {

      res.render('error', {
        status: 500,
        error: 'Server error',
        details: `Error while deleting user: ${err}: ${err.stack}`
      });

    });

  }
};

exports.app = (req, res) => res.redirect('https://app.digitallinguistics.org/');

exports.blog = (req, res) => res.redirect('http://blog.digitallinguistics.org/');

exports.data = (req, res) => res.render('error', {
  error: 'Data Explorer coming soon!'
});

exports.developer = (req, res) => res.redirect('http://developer.digitallinguistics.org');

exports.home = (req, res) => res.render('main/home');

exports.learn = (req, res) => res.render('main/learn');

exports.login = (req, res) => {
  if (req.user) {
    res.render('main/account');
  } else {
    res.login(req.headers.referer);
  }
};
