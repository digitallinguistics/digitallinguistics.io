const { copy } = require(`fs-extra`);
const path     = require(`path`);

const srcDir  = path.join(__dirname, `../src`);
const docsDir = path.join(__dirname, `../docs`);

async function copyImages() {
  await copy(path.join(srcDir, `img`), path.join(docsDir, `img`));
  await copy(path.join(srcDir, `favicon.ico`), path.join(docsDir, `favicon.ico`));
}

module.exports = copyImages;
