/* eslint-disable no-param-reassign */

const config   = require('./config');
const crypto   = require('crypto');
const https    = require('https');
const markdown = require('markdown-it')();
const qs       = require('querystring');

const almostOneHour = 3500000;
const group         = '34b39c86-4a68-3384-b22f-130017136242';
let expiration;
let token;

const formatDocs = docs => {

  docs.forEach(ref => {

    if (ref.authors) {
      const last = ref.authors.length - 1;
      if (ref.authors[last].first_name && ref.authors[last].first_name.endsWith('.')) {
        ref.authors[last].first_name = ref.authors[last].first_name.replace(/\.$/, '');
      }
    }

    ref.citation_key = ref.citation_key || '';

    if (ref.notes) ref.notes = markdown.render(ref.notes.replace(/<br\/>/g, '\n'));

    if (ref.pages) ref.pages = ref.pages.replace('-', '–');

    ref[ref.type] = true;

    ref.year = ref.year || 'n.d.';

  });

  docs.sort((a, b) => {
    if (a.citation_key < b.citation_key) return -1;
    if (a.citation_key > b.citation_key) return +1;
    return 0;
  });

  return docs;

};

const getDocs = () => new Promise((resolve, reject) => {

  const opts = {
    headers: { Authorization: `Bearer ${token}` },
    hostname: 'api.mendeley.com',
    path: `/documents?group_id=${group}&limit=500&view=all`,
  };

  const req = https.get(opts, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('error', reject);
    res.on('end', () => {
      const docs = JSON.parse(data);
      resolve(docs);
    });
  });

  req.on('error', reject);

});

const getToken = () => new Promise((resolve, reject) => {

  if (token && expiration > Date.now()) resolve();

  const opts = {
    auth:     `${config.mendeleyId}:${config.mendeleySecret}`,
    headers:  { 'Content-Type': 'application/x-www-form-urlencoded' },
    hostname: 'api.mendeley.com',
    method:   'POST',
    path:     '/oauth/token',
  };

  const body = {
    grant_type: 'client_credentials',
    scope:      'all',
    state:      crypto.randomBytes(20).toString('hex'),
  };

  const req = https.request(opts, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('error', reject);
    res.on('end', () => {
      const tokenData = JSON.parse(data);
      token      = tokenData.access_token;
      expiration = new Date().getTime() + almostOneHour;
      resolve();
    });
  });

  req.on('error', reject);
  req.end(qs.stringify(body));

});

module.exports = () => getToken().then(getDocs).then(formatDocs);
