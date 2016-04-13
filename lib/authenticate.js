const URL = require('url');

module.exports = (req, res, next) => {

  if (req.user) {
    return next();
  }

  const url = URL.format({
    hostname: req.hostname,
    pathname: req.originalUrl,
    port: process.env.NODE_ENV === 'localhost' ? process.env.PORT : '',
    protocol: req.protocol
  });

  res.login(url);

};
