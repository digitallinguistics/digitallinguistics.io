import buildCSS   from './buildCSS.js';
import buildHTML  from './buildHTML.js';
import copyAssets from './copyAssets.js';
import emptyDocs  from './emptyDocs.js';

void async function build() {

  if (!process.env.GITHUB_ACTIONS) {
    const { default: dotenv } = await import(`dotenv`);
    dotenv.config();
  }

  try {
    await emptyDocs();
    await buildHTML();
    await buildCSS();
    await copyAssets();
  } catch (e) {
    console.error(e);
    throw e;
  }

}();
