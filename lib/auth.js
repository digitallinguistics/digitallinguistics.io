const api = require('./api');
const config = require('./config');
const credentials = require('./credentials');
const https = require('https');
const qs = require('querystring');
const uuid = require('uuid');

const authRequests = [];

const getAccessToken = (service, code) => new Promise((resolve, reject) => {

  const serviceConfig = credentials.services[service][global.env];

  const body = qs.stringify({
    code: code,
    client_id: serviceConfig.clientId,
    client_secret: serviceConfig.secret,
    grant_type: 'authorization_code',
    redirect_uri: config.mapUrl('/oauth/' + service)
  });

  const opts = {
    hostname: serviceConfig.host,
    method: 'POST',
    path: serviceConfig.path,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  var tokenReq = https.request(opts, res => {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tokens = JSON.parse(data);
      resolve(tokens.user_id);
    });
  });
  tokenReq.on('error', err => reject(err));
  tokenReq.end(body, 'utf8');

});

const getAuthUrl = (service, redirect, state) => {

  const time = new Date();
  const serviceConfig = credentials.services[service][global.env];
  state = state || uuid.v4();

  const query = {
    client_id: serviceConfig.clientId,
    response_type: 'code',
    redirect_uri: config.mapUrl('/oauth/' + service),
    scope: serviceConfig.scope,
    state: state
  };

  authRequests.push({
    expires: new Date(time.getTime() + 3600000),
    redirect: redirect || '/account',
    service: service,
    state: state
  });

  return serviceConfig.baseUrl + qs.stringify(query);

};

const lookupAuthReq = state => {
  return authRequests.filter((authReq, i, arr) => {
    if (authReq.expires < new Date()) { arr.splice(i, 1); }
    return authReq.state === state;
  })[0];
};

exports.authenticate = (req, res) => {
  req.query.redirect = req.url;
  exports.login(req, res);
};

exports.login = (req, res) => {
  const authUrls = Object.keys(credentials.services).reduce((urls, service) => {
    urls[service] = getAuthUrl(service, req.query.redirect || '/account', req.query.state);
    return urls;
  }, {});

  res.render('login', { authUrls: authUrls });
};

exports.oauth = (req, res) => {

  const authReq = lookupAuthReq(req.query.state);

  if (!authReq) { res.render('error', { status: 500, details: 'There was a problem authenticating. Please try your request again.' }); }
  else {
    getAccessToken(authReq.service, req.query.code)
    .then(serviceId => {
      authReq.serviceId = serviceId;
      if (req.cookies.register) { res.redirect('/register?' + qs.stringify({ state: req.query.state })); }
      else {
        api.getUserByServiceId(authReq.service, serviceId)
        .then(result => {
          if (result.status >= 400) { res.render('error', { status: result.status, details: result.error_description }); }
          else {
            const user = result.data;
            res.login(user.rid);
            res.redirect(authReq.redirect + '?' + qs.stringify({ state: req.query.state }));
          }
        }).catch(err => res.render('error', { status: err.status || 500, details: err.error_description || err }));
      }
    }).catch(err => res.render('error', { status: err.status || 500, details: err.error_description || err }));
  }

};

exports.register = (req, res) => {

  const authReq = lookupAuthReq(req.body.state);

  if (!authReq) { res.render('error', { status: 500, details: 'There was a problem registering. Please try your request again.' }); }
  else {

    const userInfo = {
      userId: req.body.email,
      affiliation: req.body.affiliation,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      services: { [authReq.service]: authReq.serviceId }
    };

    api.registerUser(userInfo)
    .then(user => {
      res.login(user.rid);
      res.redirect(authReq.redirect + '?' + qs.stringify({ state: authReq.state }));
    })
    .catch(err => res.render('error', { status: 500, details: err }));

  }

};
