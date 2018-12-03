const CleanCSSPlugin = require(`less-plugin-clean-css`);
const less           = require(`less`);
const lessFiles      = require(`./less.json`);
const path           = require(`path`);

const {
  readFile,
  writeFile,
} = require(`fs`).promises;

const cleanCSSPlugin = new CleanCSSPlugin();

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
  await Promise.all(lessFiles.map(buildFile));
}

module.exports = buildLess;
