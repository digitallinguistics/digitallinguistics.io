import buildHTML  from './buildHTML.js';
import copyImages from './copyImages.js';
import emptyDocs  from './emptyDocs.js';

async function build() {
  await emptyDocs();
  await buildHTML();
  await copyImages();
}

build().catch(console.error);
