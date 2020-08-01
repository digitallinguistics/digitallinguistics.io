import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import Handlebars        from 'handlebars';
import path              from 'path';
import recurse           from 'recursive-readdir';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir     = path.join(currentDir, `../src`);
const docsDir    = path.join(currentDir, `../docs`);

const { compile }             = Handlebars;
const { readFile, writeFile } = fs;

async function buildHTML() {

  const mainLayout   = await readFile(path.join(srcDir, `layouts/main/main.hbs`), `utf8`);
  const mainTemplate = compile(mainLayout);

  // generate home page
  const homePage = await readFile(path.join(srcDir, `pages/home/home.hbs`), `utf8`);
  const homeHTML = mainTemplate({ page: homePage });
  await writeFile(path.join(docsDir, `index.html`), homeHTML);

  // const pageFiles  = await recurse(path.join(srcDir, `pages`));
  // const hbsFiles   = pageFiles.filter(file => path.extname(file) === `.hbs` && path.basename(file) !== `home.hbs`);

}

export default buildHTML;
