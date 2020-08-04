const fetch         = require(`node-fetch`);
const getToken      = require(`./mendeley`);
const path          = require(`path`);
const { writeFile } = require(`fs`).promises;

const {
  groupID,
  mendeleyURL,
} = require(`./constants`);

async function generateBibTeX() {

  const token = await getToken();

  const headers = {
    Accept:        `application/x-bibtex`,
    Authorization: `Bearer ${token}`,
  };

  const params = new URLSearchParams;

  params.append(`group_id`, groupID);
  params.append(`limit`, 500);
  params.append(`view`, `bib`);

  const url            = `${mendeleyURL}?${params.toString()}`;
  const response       = await fetch(url, { headers });
  const bibtex         = await response.text();
  const bibtexFilePath = path.join(__dirname, `../docs/bibliography/dlx.bib`);

  await writeFile(bibtexFilePath, bibtex, `utf8`);

}

module.exports = generateBibTeX;
