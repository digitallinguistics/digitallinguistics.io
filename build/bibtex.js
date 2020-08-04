/* eslint-disable
  camelcase,
*/

// eslint-disable-next-line no-shadow
const fetch         = require(`node-fetch`);
const getToken      = require(`./mendeley`);
const path          = require(`path`);
const { writeFile } = require(`fs`).promises;

const bibtexURL = `https://api.mendeley.com/documents`;
const group_id  = `34b39c86-4a68-3384-b22f-130017136242`;

async function generateBibTeX() {

  const token = await getToken();

  const headers = {
    Accept:        `application/x-bibtex`,
    Authorization: `Bearer ${token}`,
  };

  const params = new URLSearchParams;

  params.append(`group_id`, group_id);
  params.append(`limit`, 500);
  params.append(`view`, `bib`);

  const url            = `${bibtexURL}?${params.toString()}`;
  const response       = await fetch(url, { headers });
  const bibtex         = await response.text();
  const bibtexFilePath = path.join(__dirname, `../docs/bibliography/dlx.bib`);

  await writeFile(bibtexFilePath, bibtex, `utf8`);

}

module.exports = generateBibTeX;

generateBibTeX();
