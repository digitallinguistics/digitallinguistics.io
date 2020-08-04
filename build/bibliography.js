const fetch    = require(`node-fetch`);
const getToken = require(`./mendeley`);

const {
  groupID,
  mendeleyURL,
} = require(`./constants`);

async function getReferences() {

  const token = await getToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = new URLSearchParams;

  params.append(`group_id`, groupID);
  params.append(`limit`, 500);
  params.append(`view`, `all`);

  const url        = `${mendeleyURL}?${params.toString()}`;
  const response   = await fetch(url, { headers });
  return response.json();

}

module.exports = getReferences;
