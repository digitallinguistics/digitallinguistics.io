const dlxdb = require('dlx-documentdb');
const qs = require('querystring');

const db = dlxdb({
  id: 'dlx',
  masterKey: process.env.DOCUMENTDB
});

module.exports = (req, res, next) => {

  console.log('originalUrl', req.originalUrl);
  console.log('url', req.url);
  console.log('hostname', req.hostname);
  console.log('referer', req.headers.referer);

  res.login = redirect => {
    console.log(redirect);
    const query = { redirect_uri: redirect };
    res.redirect(`https://login.digitallinguistics.org/authenticate?${qs.stringify(query)}`);
  };

  res.logout = () => {
    req.user = res.locals.user = null;
    res.clearCookie('user');
  };

  const fourHours = 14400000;

  res.setCookie = id => res.cookie('user', id, {
    signed: true,
    domain: `.${process.env.DOMAIN}`,
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

    res.logout();
    return next();

  }

};
