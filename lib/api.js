const credentials = require('./credentials');
const https = require('https');
const qs = require('querystring');

exports.getUserByRid = rid => new Promise((resolve, reject) => {

  const opts = {
    auth: 'dlx-org:' + credentials.secret,
    hostname: 'api.digitallinguistics.org',
    path: '/v1/users/' + rid
  };

  https.get(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', err => reject(err));
    res.on('end', () => resolve(data));
  });

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

  https.get(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', reject);
    res.on('end', () => {
      data = JSON.parse(data);
      if (data.status >= 400) { reject(data); }
      else { resolve(data); }
    });
  });

});

exports.upsertUser = user => new Promise((resolve, reject) => {

  const opts = {
    auth: 'dlx-org:' + credentials.secret,
    hostname: 'api.digitallinguistics.org',
    method: 'POST',
    path: '/v1/users/'
  };

  const req = https.request(opts, res => {
    var data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', err => reject(err));
    res.on('end', () => resolve(data));
  });
  req.on('error', err => reject(err));
  req.write(JSON.stringify(user));
  req.end();

});
