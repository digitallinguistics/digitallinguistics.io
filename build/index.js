import buildHTML from './buildHTML.js';
import emptyDocs from './emptyDocs.js';

async function build() {
  await emptyDocs();
  await buildHTML();
}

build().catch(console.error);
