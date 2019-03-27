const path = require(`path`);

const {
  copy: copyFile,
  mkdirp: createDir,
  remove: removeDir,
} = require(`fs-extra`);

const JSDir   = path.join(__dirname, `../public/js`);
const mainDir = path.join(__dirname, `../views/layouts/main`);

async function buildJS() {
  try {
    await removeDir(JSDir);
    await createDir(JSDir);
    await copyFile(path.join(mainDir, `main.js`), path.join(JSDir, `main.js`));
  } catch (e) {
    console.error(e);
  }
}

if (require.main === module) buildJS();
else module.exports = buildJS;
