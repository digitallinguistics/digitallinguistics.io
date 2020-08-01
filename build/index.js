const buildHTML  = require(`./buildHTML`);
const copyImages = require(`./copyImages`);
const emptyDocs  = require(`./emptyDocs`);

async function build() {
  await emptyDocs();
  await buildHTML();
  await copyImages();
}

build().catch(console.error);
