const api = require('./api');
const config = require('./config.js');

exports.error404 = (req, res) => {
  res.status(404);
  res.render('error', { status: 404, details: 'Not found.' });
};

exports.error500 = (err, req, res, next) => { // jshint ignore:line
  res.status(500);
  res.render('error', { status: 500, details: `Internal server error. Please open an issue on GitHub: <a>${config.bugs}</a>` });
};

exports.logUrl = (req, res, next) => {
  console.log('Requested URL:', req.url);
  next();
};

exports.requestParser = (req, res, next) => {

  if (req.method === 'POST' && !req.headers['content-type']) {
    req.headers['content-type'] = 'application/json';
  }

  var domain;
  switch (global.env) {
    case 'localhost': domain = 'localhost'; break;
    case 'development': domain = 'dlx-dev.azurewebsites.net'; break;
    case 'production': domain = 'digitallinguistics.org'; break;
  }

  const resetCookie = rid => res.cookie('user', rid, {
    maxAge: 3600000,
    signed: true,
    domain: domain
  });

  res.login = rid => resetCookie(rid);

  res.logout = () => {
    res.clearCookie('user', { signed: true });
    res.locals.user = {};
  };

  if (req.query.logout) {
    res.logout();
    req.loggedIn = false;
    res.redirect('/');
  } else if (req.signedCookies.user && req.signedCookies.user !== 'undefined') {
    const rid = req.signedCookies.user;
    api.getUserByRid(rid)
    .then(result => {
      if (result.status === 200) {
        resetCookie(result.data.rid);
        req.loggedIn = true;
        res.locals.user = result.data;
      }
      next();
    })
    .catch(err => res.render('error', { status: 500, details: err }));
  } else {
    req.loggedIn = false;
    next();
  }

};
