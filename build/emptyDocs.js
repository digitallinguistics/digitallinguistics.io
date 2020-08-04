const { emptyDir } = require(`fs-extra`);
const path         = require(`path`);

async function emptyDocs() {
  await emptyDir(path.join(__dirname, `../docs`));
}

module.exports = emptyDocs;
