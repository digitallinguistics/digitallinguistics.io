const credentials = require('./credentials');
const https = require('https');

exports.getUser = rid => new Promise((resolve, reject) => {

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
