/* eslint-disable
  camelcase,
*/

// eslint-disable-next-line no-shadow
const fetch = require(`node-fetch`);

if (!process.env.MENDELEY_SECRET) {
  require(`./credentials`);
}

const tokenURL = `https://api.mendeley.com/oauth/token`;

async function getToken() {

  if (process.env.MENDELEY_TOKEN) return process.env.MENDELEY_TOKEN;

  const credentials = Buffer.from(`${process.env.MENDELEY_ID}:${process.env.MENDELEY_SECRET}`).toString('base64');
  const headers     = { Authorization: `Basic ${credentials}` };
  const params      = new URLSearchParams;

  params.append(`grant_type`, `client_credentials`);
  params.append(`scope`, `all`);

  const body = params;

  const response         = await fetch(tokenURL, { body, headers, method: `POST` });
  const { access_token } = await response.json();

  // eslint-disable-next-line require-atomic-updates
  process.env.MENDELEY_TOKEN = access_token;

  return access_token;

}

module.exports = getToken;
