/* eslint-disable
  no-await-in-loop,
*/

const CleanCSSPlugin = require(`less-plugin-clean-css`);
const path           = require(`path`);
const recurse        = require(`recursive-readdir`);
const { render }     = require(`less`);

const {
  outputFile,
  readFile,
} = require(`fs-extra`);

const docsDir = path.join(__dirname, `../docs`);
const srcDir  = path.join(__dirname, `../src`);

const cleanCSSPlugin = new CleanCSSPlugin;
const lessOptions    = { math: `strict`, plugins: [cleanCSSPlugin] };

async function buildCSS() {

  // build CSS for main layout

  const mainLess         = await readFile(path.join(srcDir, `layouts/main/main.less`), `utf8`);
  const { css: mainCSS } = await render(mainLess, lessOptions);

  await outputFile(path.join(docsDir, `main.css`), mainCSS, `utf8`);

  // build CSS for Home page

  const homeLess         = await readFile(path.join(srcDir, `pages/home/home.less`), `utf8`);
  const { css: homeCSS } = await render(homeLess, lessOptions);

  await outputFile(path.join(docsDir, `home.css`), homeCSS, `utf8`);

  // build remaining pages

  const files = await recurse(srcDir, [ignore]);

  for (const file of files) {

    const less    = await readFile(file, `utf8`);
    const { css } = await render(less, lessOptions);
    const page    = path.basename(file, `.less`);

    await outputFile(path.join(docsDir, `${page}/${page}.css`), css, `utf8`);

  }

}

// Ignores non-LESS files
function ignore(file, stats) {
  if (stats.isDirectory()) return false;
  if (path.extname(file) !== `.less`) return true;
  if (file.includes(`home.less`)) return true;
  if (file.includes(`main.less`)) return true;
}

module.exports = buildCSS;
