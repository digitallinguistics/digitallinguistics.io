const buildCSS   = require(`./buildCSS`);
const buildHTML  = require(`./buildHTML`);
const copyImages = require(`./copyImages`);
const emptyDocs  = require(`./emptyDocs`);

void async function build() {
  try {
    await emptyDocs();
    await buildHTML();
    await buildCSS();
    await copyImages();
  } catch (e) {
    console.error(e);
    throw e;
  }
}();
