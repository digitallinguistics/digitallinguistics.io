/* eslint-disable
  camelcase,
*/

const fetch = require(`node-fetch`);

if (!process.env.MENDELEY_SECRET) {
  require(`./credentials`);
}

const tokenURL = `https://api.mendeley.com/oauth/token`;

async function getToken() {

  console.log(process.env.MENDELEY_TOKEN);
  if (process.env.MENDELEY_TOKEN) return process.env.MENDELEY_TOKEN;

  console.log(process.env.MENDELEY_ID);
  console.log(process.env.MENDELEY_SECRET);

  const credentials = Buffer.from(`${process.env.MENDELEY_ID}:${process.env.MENDELEY_SECRET}`).toString('base64');
  const headers     = { Authorization: `Basic ${credentials}` };
  const params      = new URLSearchParams;

  console.log(headers);

  params.append(`grant_type`, `client_credentials`);
  params.append(`scope`, `all`);

  const body = params;

  const response         = await fetch(tokenURL, { body, headers, method: `POST` });
  const { access_token } = await response.json();

  console.log(access_token);

  // eslint-disable-next-line require-atomic-updates
  process.env.MENDELEY_TOKEN = access_token;

  return access_token;

}

module.exports = getToken;
