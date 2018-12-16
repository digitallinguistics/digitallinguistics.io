/* eslint-disable
  camelcase,
*/

// IMPORTS
const request = require(`superagent`);

const {
  mendeleyBibliography,
  mendeleyID,
  mendeleySecret,
} = require(`../config`);

// VARIABLES
const baseURL = `https://api.mendeley.com`;
const oneHour = 60 * 60 * 1000; // one hour in milliseconds

let access_token;
let expiration = new Date;

async function authenticate() {

  const res = await request
  .post(`${baseURL}/oauth/token`)
  .auth(mendeleyID, mendeleySecret)
  .type(`form`)
  .send({ grant_type: `client_credentials` })
  .send({ scope: `all` });

  ({ access_token } = res.body);
  expiration = new Date(Date.now() + oneHour);

}

function isAuthenticated() {
  const expired = new Date().getTime() >= expiration.getTime();
  return Boolean(access_token && !expired);
}

async function getReferences() {

  if (!isAuthenticated()) await authenticate();

  const params = {
    group_id: mendeleyBibliography,
    limit:    500,
    view:     `all`,
  };

  const res = await request
  .get(`${baseURL}/documents`)
  .set(`Authorization`, `Bearer ${access_token}`)
  .query(params);

  return res.body;

}

// EXPORT
module.exports = getReferences;
