const crypto = require('crypto');
const https = require('https');
const qs = require('querystring');

var access_token;
const groupID = '652df449-f6e4-3a33-a561-e441378c8caf';

module.exports = {

  authenticate () {

    return new Promise((resolve, reject) => {

      const state = crypto.randomBytes(20).toString('hex'); // eslint-disable-line

      const opts = {
        auth: `${process.env.MENDELEY_ID}:${process.env.MENDELEY_SECRET}`,
        hostname: 'api.mendeley.com',
        method: 'POST',
        path: '/oauth/token?',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      const body = {
        grant_type: 'client_credentials',
        scope: 'all',
        state: state
      };

      const req = https.request(opts, res => {
        var data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('error', err => {
          console.error(err, err.stack);
          reject(err);
        });
        res.on('end', () => {
          data = JSON.parse(data);
          access_token = data.access_token;
          resolve(access_token);
        });
      });
      req.on('error', err => {
        console.error(err, err.stack);
        reject(err);
      });
      req.end(qs.stringify(body), 'utf8');

    });

  },

  getDocs () {

    return new Promise((resolve, reject) => {

      const opts = {
        hostname: 'api.mendeley.com',
        path: `/documents?group_id=${groupID}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      };

      const req = https.get(opts, res => {
        var data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('error', err => {
          console.error(err, err.stack);
          reject(err);
        });
        res.on('end', () => {
          data = JSON.parse(data);
          this.documents = data;
          console.log(data);
          resolve(this.documents);
        });
      });

      req.on('error', err => {
        console.error(err, err.stack);
        reject(err);
      });

    });

  }

};
