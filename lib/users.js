const dlxdb = require('dlx-documentdb');
const qs = require('querystring');

const db = dlxdb({
  id: 'dlx',
  masterKey: process.env.DOCUMENTDB
});

/* eslint-disable consistent-return */
module.exports = (req, res, next) => {

  res.login = redirect => {
    const query = { redirect_uri: redirect };
    res.redirect(`https://login.digitallinguistics.org?${qs.stringify(query)}`);
  };

  res.logout = () => {
    req.user = null;
    res.clearCookie('user');
  };

  if (req.query.logout === 'true') {

    res.logout();
    return next();

  } else if (req.signedCookies.user) {

    db.get('users', req.signedCookies.user)
    .then(user => {

      req.user = user;
      return next();

    }).catch(err => {

      const indent = 2;
      res.logout();
      res.render('error', {
        status: 500,
        error: 'Server error',
        details: `Unable to retrieve user from database: ${JSON.stringify(err, null, indent)}`
      });

    });

  } else {

    return next();

  }

};
