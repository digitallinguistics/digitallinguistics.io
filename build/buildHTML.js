/* eslint-disable
  no-await-in-loop,
*/

const { capitalCase } = require(`capital-case`);
const { compile }     = require(`./handlebars`);
const createSprites   = require(`./buildSVG.js`);
const path            = require(`path`);
const recurse         = require(`recursive-readdir`);

const { readFile, outputFile } = require(`fs-extra`);

const srcDir  = path.join(__dirname, `../src`);
const docsDir = path.join(__dirname, `../docs`);

async function buildHTML() {

  const svg = await createSprites();

  const mainLayout   = await readFile(path.join(srcDir, `layouts/main/main.hbs`), `utf8`);
  const mainTemplate = compile(mainLayout);

  // generate home page

  const homeContext = {
    home:     true,
    pageName: `home`,
    title:    `Home`,
  };

  const homePage     = await readFile(path.join(srcDir, `pages/home/home.hbs`), `utf8`);
  const homeTemplate = compile(homePage);
  const homeHTML     = homeTemplate(homeContext);
  const outputHTML   = mainTemplate({ page: homeHTML, svg, ...homeContext });

  await outputFile(path.join(docsDir, `index.html`), outputHTML);

  // generate individual pages

  const files = await recurse(path.join(srcDir, `pages`), [ignoreHomeFiles]);

  for (const file of files) {

    const page         = await readFile(file, `utf8`);
    const pageName     = path.basename(file, `.hbs`);
    const title        = capitalCase(pageName);
    const context      = { pageName, title };
    const pageTemplate = compile(page);
    const pageHTML     = pageTemplate(context);
    const html         = mainTemplate({
      page:       pageHTML,
      [pageName]: true,
      svg,
      ...context,
    });

    await outputFile(path.join(docsDir, `${pageName}/index.html`), html);

  }

}

function ignoreHomeFiles(file, stats) {
  if (stats.isDirectory() && path.basename(file) === `home`) return true;
  if (stats.isDirectory()) return false;
  if (path.extname(file) !== `.hbs`) return true;
}

module.exports = buildHTML;
