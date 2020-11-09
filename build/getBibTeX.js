import fetch             from 'node-fetch';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import getMendeleyToken  from './getMendeleyToken.js';
import path              from 'path';

const { writeFile } = fs;

const currentDir   = path.dirname(fileURLToPath(import.meta.url));
const documentsURL = `https://api.mendeley.com/documents`;

export default async function generateBibTeX() {

  const token = await getMendeleyToken();

  const headers = {
    Accept:        `application/x-bibtex`,
    Authorization: `Bearer ${token}`,
  };

  const params = new URLSearchParams;

  params.append(`group_id`, process.env.MENDELEY_GROUP_ID);
  params.append(`limit`, 500);
  params.append(`view`, `bib`);

  const url            = `${documentsURL}?${params.toString()}`;
  const response       = await fetch(url, { headers });
  const bibtex         = await response.text();
  const bibtexFilePath = path.join(currentDir, `../dist/bibliography/dlx.bib`);

  await writeFile(bibtexFilePath, bibtex, `utf8`);

}
