import fetch            from 'node-fetch';
import getMendeleyToken from './getMendeleyToken.js';

const documentsURL = `https://api.mendeley.com/documents`;

export default async function getReferences() {

  const token = await getMendeleyToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = new URLSearchParams;

  params.append(`group_id`, process.env.MENDELEY_GROUP_ID);
  params.append(`limit`, 500);
  params.append(`view`, `all`);

  const url        = `${documentsURL}?${params.toString()}`;
  const response   = await fetch(url, { headers });
  return response.json();

}
