const CleanCSSPlugin = require(`less-plugin-clean-css`);
const less           = require(`less`);
const lessFiles      = require(`./less.json`);
const rimraf         = require(`rimraf`);
const path           = require(`path`);
const { promisify }  = require(`util`);

const {
  mkdir,
  readFile,
  writeFile,
} = require(`fs`).promises;

const removeDir      = promisify(rimraf);
const cleanCSSPlugin = new CleanCSSPlugin();
const CSSDir         = path.join(__dirname, `../public/css`);

async function buildFile(filePath) {
  const inputPath      = path.join(__dirname, `..`, filePath);
  const lessInput      = await readFile(inputPath, `utf8`);
  const { css }        = await less.render(lessInput, { plugins: [cleanCSSPlugin] });
  const inputFilename  = path.basename(inputPath);
  const outputFilename = inputFilename.replace(`.less`, `.css`);
  const outputPath     = path.join(__dirname, `../public/css`, outputFilename);
  await writeFile(outputPath, css, `utf8`);
}

/**
 * Builds all the LESS files listed in less.json
 */
async function buildLess() {

  try {
    await removeDir(CSSDir);
  } catch (e) {
    console.error(e);
  }

  try {
    await mkdir(CSSDir);
    await Promise.all(lessFiles.map(buildFile));
    console.info(` - LESS files built`);
  } catch (e) {
    console.error(e);
  }

}

module.exports = buildLess;
