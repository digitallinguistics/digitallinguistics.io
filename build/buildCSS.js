const CleanCSSPlugin = require(`less-plugin-clean-css`);
const createSpinner  = require(`ora`);
const less           = require(`less`);
const lessFiles      = require(`../manifest/less.json`);
const path           = require(`path`);

const {
  mkdirp: makeDir,
  readFile,
  remove: removeDir,
  writeFile,
} = require(`fs-extra`);

const cleanCSSPlugin = new CleanCSSPlugin();
const CSSDir         = path.join(__dirname, `../public/css`);

const lessOptions = {
  plugins: [cleanCSSPlugin],
};

async function buildFile(filePath) {
  const inputPath      = path.join(__dirname, `..`, filePath);
  const lessInput      = await readFile(inputPath, `utf8`);
  const { css }        = await less.render(lessInput, lessOptions);
  const inputFilename  = path.basename(inputPath);
  const outputFilename = inputFilename.replace(`.less`, `.css`);
  const outputPath     = path.join(__dirname, `../public/css`, outputFilename);
  await writeFile(outputPath, css, `utf8`);
}

/**
 * Builds all the LESS files listed in less.json
 */
async function buildLess() {

  const spinner = createSpinner(`Building CSS files`);

  spinner.start();

  try {
    await removeDir(CSSDir);
    await makeDir(CSSDir);
    await Promise.all(lessFiles.map(buildFile));
  } catch (e) {
    spinner.fail(e);
  }

  spinner.succeed(`CSS files built`);

}

module.exports = buildLess;
