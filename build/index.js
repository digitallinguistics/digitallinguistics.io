const buildCSS   = require(`./buildCSS`);
const buildHTML  = require(`./buildHTML`);
const copyImages = require(`./copyImages`);
const emptyDocs  = require(`./emptyDocs`);

async function build() {
  await emptyDocs();
  await buildHTML();
  await buildCSS();
  await copyImages();
}

build().catch(err => {
  console.error(err);
  throw err;
});
