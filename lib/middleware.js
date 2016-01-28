const config = require('./config.js');
const api = require('./api');

exports.body = (req, res, next) => {
  if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
    req.headers['content-type'] = 'application/json';
  }
  next();
};

exports.error404 = (req, res) => {
  res.status(404);
  res.render('error', { status: 404, details: 'Not found.' });
};

exports.error500 = (err, req, res, next) => {
  res.status(500);
  res.render('error', { status: 500, details: `Internal server error. Please open an issue on GitHub: <a>${config.bugs}</a>` });
};

exports.hbsOptions = {
  defaultLayout: 'main',

  helpers: {
    // don't use arrow functions here - need to retain value of `this`
    section: function (name, opts) {
      if (!this.sections) { this.sections = {}; }
      this.sections[name] = opts.fn(this);
      return null;
    }
  }
};

exports.logUrl = (req, res, next) => {
  console.log('Requested URL:', req.url);
  next();
};

exports.logins = (req, res, next) => {
  const resetCookie = rid => {
    res.cookie('user', rid, { maxAge: 3600000 });
  };

  res.login = rid => resetCookie(rid);

  res.logout = () => {
    res.clearCookie('user');
    res.locals.user = {};
  };

  if (req.query.logout) {
    res.logout();
    req.loggedIn = false;
    res.redirect('/');
  } else if (req.signedCookies.user) {
    const rid = decrypt(req.signedCookies.user);
    api.getUserByRid(rid)
    .then(user => {
      resetCookie(req.signedCookies.user);
      res.locals.user = user;
      req.loggedIn = true;
      next();
    })
    .catch(err => res.render('error', { status: 500, details: err }));
  } else {
    req.loggedIn = false;
    next();
  }

};
