/* eslint-disable
  camelcase,
  require-atomic-updates,
*/

import fetch         from 'node-fetch';
import { stringify } from 'querystring';

const tokenURL = `https://api.mendeley.com/oauth/token`;
let access_token;

export default async function getMendeleyToken() {

  if (access_token) return access_token;

  const { MENDELEY_ID, MENDELEY_SECRET } = process.env;

  const auth = Buffer.from(`${MENDELEY_ID}:${MENDELEY_SECRET}`)
  .toString(`base64`);

  const body = stringify({
    grant_type: `client_credentials`,
    scope:      `all`,
  });

  const response = await fetch(tokenURL, {
    body,
    headers: {
      Authorization:  `Basic ${auth}`,
      'Content-Type': `application/x-www-form-urlencoded`,
    },
    method: `POST`,
  });

  ({ access_token } = await response.json());

  return access_token;

}
