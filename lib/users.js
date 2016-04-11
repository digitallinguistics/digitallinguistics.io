const dlxdb = require('dlx-documentdb');
const qs = require('querystring');

const db = dlxdb({
  id: 'dlx',
  masterKey: process.env.DOCUMENTDB
});

module.exports = (req, res, next) => {

  res.login = redirect => {
    const query = { redirect_uri: redirect };
    res.redirect(`https://login.digitallinguistics.org?${qs.stringify(query)}`);
  };

  res.logout = () => {
    req.user = res.locals.user = null;
    res.clearCookie('user');
  };

  var domain;
  const fourHours = 14400000;

  switch (process.env.NODE_ENV) {
    case 'localhost': domain = 'localhost'; break;
    case 'development': domain = 'dlx-dev.azurewebsites.net'; break;
    case 'production': domain = 'digitallinguistics.org'; break;
  }

  res.setCookie = id => res.cookie('user', id, {
    signed: true,
    domain: domain,
    maxAge: fourHours
  });

  if (req.query.logout === 'true') {

    res.logout();
    return next();

  } else if (req.signedCookies.user) {

    db.get(req.signedCookies.user)
    .then(user => {

      req.user = res.locals.user = user;
      return next();

    }).catch(err => {

      res.logout();
      res.render('error', {
        status: 500,
        error: 'Server error',
        details: `Unable to retrieve user from database: ${JSON.stringify(err, null, 2)}` // eslint-disable-line
      });

    });

  } else {

    req.user = res.locals.user = null;
    return next();

  }

};
