const credentials = require('./credentials');
const https = require('https');

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

exports.getUserByServiceId = serviceId => new Promise((resolve, reject) => {
  // TODO: Call api.digitallinguistics.org/v1/users?serviceId={serviceId}, with a savedata auth header
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
