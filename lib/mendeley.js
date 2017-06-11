/* eslint-disable
  camelcase,
  no-param-reassign,
*/

const config   = require('./config');
const crypto   = require('crypto');
const markdown = require('markdown-it')();
const req      = require('superagent');

const almostOneHour = 3500000;
const authData      = {};
const authUrl       = `https://api.mendeley.com/oauth/token`;
const docsUrl       = `https://api.mendeley.com/documents`;

const query = {
  group_id: `34b39c86-4a68-3384-b22f-130017136242`,
  limit:    500,
  view:     `all`,
};

const formatDocs = docs => {

  docs.forEach(ref => {

    if (ref.authors) {
      const last = ref.authors.length - 1;
      if (ref.authors[last].first_name && ref.authors[last].first_name.endsWith(`.`)) {
        ref.authors[last].first_name = ref.authors[last].first_name.replace(/\.$/, ``);
      }
    }

    ref.citation_key = ref.citation_key || ``;

    if (ref.notes) ref.notes = markdown.render(ref.notes.replace(/<br\/>/g, `\n`));

    if (ref.pages) ref.pages = ref.pages.replace(`-`, `–`);

    ref[ref.type] = true;

    ref.year = ref.year || `n.d.`;

  });

  docs.sort((a, b) => {
    if (a.citation_key < b.citation_key) return -1;
    if (a.citation_key > b.citation_key) return +1;
    return 0;
  });

  return docs;

};

const getDocs = () => req.get(docsUrl)
.query(query)
.set(`Authorization`, `Bearer ${authData.token}`)
.then(res => res.body);

const getToken = async () => {

  if (authData.token && authData.expiration > Date.now()) return;

  const body = {
    grant_type: `client_credentials`,
    scope:      `all`,
    state:      crypto.randomBytes(20).toString(`hex`),
  };

  const res = await req.post(authUrl)
  .set(`Content-Type`, `application/x-www-form-urlencoded`)
  .auth(config.mendeleyId, config.mendeleySecret)
  .send(body);

  authData.token      = res.body.access_token;
  authData.expiration = new Date().getTime() + almostOneHour;

};

module.exports = async () => {
  await getToken();
  const docs = await getDocs();
  return formatDocs(docs);
};
