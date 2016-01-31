const credentials = require('./credentials');
const https = require('https');
const qs = require('querystring');

exports.deleteUser = rid => new Promise((resolve, reject) => {
  // TODO: make the request to the API to delete the user
});

exports.getUserByRid = rid => new Promise((resolve, reject) => {

  const opts = {
    auth: 'dlx-org:' + credentials.secret,
    hostname: 'api.digitallinguistics.org',
    path: '/v1/users/' + encodeURIComponent(rid)
  };

  const req = https.get(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', err => reject(JSON.parse(err)));
    res.on('end', () => resolve(JSON.parse(data)));
  });
  req.on('error', err => reject(JSON.parse(err)));

});

exports.getUserByServiceId = (service, serviceId) => new Promise((resolve, reject) => {

  const params = qs.stringify({
    service: service,
    id: serviceId
  });

  const opts = {
    auth: 'dlx-org:' + credentials.secret,
    hostname: 'api.digitallinguistics.org',
    path: '/v1/users?' + params
  };

  const req = https.get(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', err => reject(JSON.parse(err)));
    res.on('end', () => resolve(JSON.parse(data)));
  });
  req.on('error', err => reject(JSON.parse(err)));

});

exports.registerUser = userInfo => new Promise((resolve, reject) => {

  const opts = {
    auth: 'dlx-org:' + credentials.secret,
    hostname: 'api.digitallinguistics.org',
    method: 'PUT',
    path: '/v1/users'
  };

  const req = https.request(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', err => reject(JSON.parse(err)));
    res.on('end', () => resolve(JSON.parse(data)));
  });
  req.on('error', err => reject(JSON.parse(err)));
  req.write(JSON.stringify(userInfo));
  req.end();

});

exports.updateUser = user => new Promise((resolve, reject) => {

  const opts = {
    auth: 'dlx-org:' + credentials.secret,
    hostname: 'api.digitallinguistics.org',
    method: 'POST',
    path: '/v1/users/' + user.id
  };

  const req = https.request(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', err => reject(JSON.parse(err)));
    res.on('end', () => resolve(JSON.parse(data)));
  });
  req.on('error', err => reject(JSON.parse(err)));
  req.write(JSON.stringify(user));
  req.end();

});
