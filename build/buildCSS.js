/* eslint-disable
  no-await-in-loop,
*/

import CleanCSSPlugin    from 'less-plugin-clean-css';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import less              from 'less';
import path              from 'path';
import recurse           from 'recursive-readdir';

const { outputFile, readFile } = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const distDir    = path.join(currentDir, `../dist`);
const srcDir     = path.join(currentDir, `../src`);

const cleanCSSPlugin = new CleanCSSPlugin;

const lessOptions = {
  math:    `strict`,
  paths:   [`src/layouts/main`],
  plugins: [cleanCSSPlugin],
};

// Ignores non-LESS files
function ignore(file, stats) {
  if (stats.isDirectory()) return false;
  if (path.extname(file) !== `.less`) return true;
  if (file.includes(`home.less`)) return true;
  if (file.includes(`main.less`)) return true;
}

export default async function buildCSS() {

  // build CSS for main layout

  const mainLess         = await readFile(path.join(srcDir, `layouts/main/main.less`), `utf8`);
  const { css: mainCSS } = await less.render(mainLess, lessOptions);

  await outputFile(path.join(distDir, `main.css`), mainCSS, `utf8`);

  // build CSS for Home page

  // const homeLess         = await readFile(path.join(srcDir, `pages/home/home.less`), `utf8`);
  // const { css: homeCSS } = await render(homeLess, lessOptions);

  // await outputFile(path.join(distDir, `home.css`), homeCSS, `utf8`);

  // build remaining pages

  // const files = await recurse(srcDir, [ignore]);

  // for (const file of files) {
  //
  //   const less    = await readFile(file, `utf8`);
  //   const { css } = await render(less, lessOptions);
  //   const page    = path.basename(file, `.less`);
  //
  //   await outputFile(path.join(distDir, `${page}/${page}.css`), css, `utf8`);
  //
  // }

}

buildCSS();
