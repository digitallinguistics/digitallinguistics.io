/* eslint-disable
  camelcase,
  max-statements,
  no-await-in-loop,
  no-param-reassign,
*/

const { capitalCase } = require(`capital-case`);
const compare         = require(`compare-func`);
const createSprites   = require(`./buildSVG`);
const getReferences   = require(`./bibliography`);
const hbs             = require(`./handlebars`);
const markdown        = require(`./markdown`);
const path            = require(`path`);
const recurse         = require(`recursive-readdir`);

const { readFile, outputFile } = require(`fs-extra`);

const srcDir  = path.join(__dirname, `../src`);
const docsDir = path.join(__dirname, `../docs`);

async function buildHTML() {

  const svg = await createSprites();

  const mainContext = {
    production: process.env.GITHUB_ACTIONS,
    svg,
  };

  const mainLayout   = await readFile(path.join(srcDir, `layouts/main/main.hbs`), `utf8`);
  const mainTemplate = hbs.compile(mainLayout);

  // generate home page

  const homeContext = {
    home:     true,
    pageName: `home`,
    title:    `Home`,
  };

  const homePage     = await readFile(path.join(srcDir, `pages/home/home.hbs`), `utf8`);
  const homeTemplate = hbs.compile(homePage);
  const homeHTML     = homeTemplate(Object.assign(homeContext, mainContext));
  const outputHTML   = mainTemplate({ page: homeHTML, ...homeContext });

  await outputFile(path.join(docsDir, `index.html`), outputHTML);

  // generate individual pages

  const files = await recurse(path.join(srcDir, `pages`), [ignoreHomeFiles]);

  for (const file of files) {

    const page     = await readFile(file, `utf8`);
    const pageName = path.basename(file, `.hbs`);
    const title    = capitalCase(pageName);
    const context  = Object.assign({ pageName, title }, mainContext);

    if (pageName === `bibliography`) {

      context.references = await getReferences();

      context.references = context.references
      .filter(ref => ref.read)
      .map(convertMarkdown)
      .sort(compare(`citation_key`));

      context.numReferences = context.references.length;

      const lastModified = context.references
      .reduce((latest, { last_modified }) => (last_modified >= latest ? last_modified : latest), ``);

      context.lastUpdated = new Date(lastModified || new Date).toLocaleDateString(`en-US`, {
        day:   'numeric',
        month: 'long',
        year:  'numeric',
      });

    }

    const pageTemplate = hbs.compile(page);
    const pageHTML     = pageTemplate(context);
    const html         = mainTemplate({
      page:       pageHTML,
      [pageName]: true,
      ...context,
    });

    await outputFile(path.join(docsDir, `${pageName}/index.html`), html);

  }

}

function convertMarkdown(ref) {
  ref.title = new hbs.SafeString(markdown.renderInline(ref.title));
  return ref;
}

function ignoreHomeFiles(file, stats) {
  if (stats.isDirectory() && path.basename(file) === `home`) return true;
  if (stats.isDirectory()) return false;
  if (path.extname(file) !== `.hbs`) return true;
}

module.exports = buildHTML;
