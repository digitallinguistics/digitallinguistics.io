/* eslint-disable
  no-await-in-loop,
*/

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import Handlebars        from 'handlebars';
import path              from 'path';
import recurse           from 'recursive-readdir';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir     = path.join(currentDir, `../src`);
const docsDir    = path.join(currentDir, `../docs`);

const { compile }              = Handlebars;
const { readFile, outputFile } = fs;

async function buildHTML() {

  const mainLayout   = await readFile(path.join(srcDir, `layouts/main/main.hbs`), `utf8`);
  const mainTemplate = compile(mainLayout);

  // generate home page

  const homePage = await readFile(path.join(srcDir, `pages/home/home.hbs`), `utf8`);
  const homeHTML = mainTemplate({ page: homePage });

  await outputFile(path.join(docsDir, `index.html`), homeHTML);

  // generate individual pages

  const files = await recurse(path.join(srcDir, `pages`), [ignoreHomeFiles]);

  for (const file of files) {

    const page     = await readFile(file, `utf8`);
    const pageHTML = mainTemplate({ page });
    const pageName = path.basename(file, `.hbs`);

    await outputFile(path.join(docsDir, `${pageName}/index.html`), pageHTML);

  }

}

function ignoreHomeFiles(file, stats) {
  if (stats.isDirectory() && path.basename(file) === `home`) return true;
  if (stats.isDirectory()) return false;
  if (path.extname(file) !== `.hbs`) return true;
}

export default buildHTML;
