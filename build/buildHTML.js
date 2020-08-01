/* eslint-disable
  no-await-in-loop,
*/

const { capitalCase } = require(`capital-case`);
const { compile }     = require(`./handlebars`);
const path            = require(`path`);
const recurse         = require(`recursive-readdir`);

const { readFile, outputFile } = require(`fs-extra`);

const srcDir  = path.join(__dirname, `../src`);
const docsDir = path.join(__dirname, `../docs`);

async function buildHTML() {

  const mainLayout   = await readFile(path.join(srcDir, `layouts/main/main.hbs`), `utf8`);
  const mainTemplate = compile(mainLayout);

  // generate home page

  const homePage = await readFile(path.join(srcDir, `pages/home/home.hbs`), `utf8`);
  const homeHTML = mainTemplate({ page: homePage, title: `Home` });

  await outputFile(path.join(docsDir, `index.html`), homeHTML);

  // generate individual pages

  const files = await recurse(path.join(srcDir, `pages`), [ignoreHomeFiles]);

  for (const file of files) {

    const page     = await readFile(file, `utf8`);
    const pageName = path.basename(file, `.hbs`);
    const title    = capitalCase(pageName);
    const pageHTML = mainTemplate({ page, title });

    await outputFile(path.join(docsDir, `${pageName}/index.html`), pageHTML);

  }

}

function ignoreHomeFiles(file, stats) {
  if (stats.isDirectory() && path.basename(file) === `home`) return true;
  if (stats.isDirectory()) return false;
  if (path.extname(file) !== `.hbs`) return true;
}

module.exports = buildHTML;
