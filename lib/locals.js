const { cdn }    = require(`../config`);
const getSprites = require(`./svg`);
const meta       = require(`../package.json`);

async function getLocals() {

  const svg = await getSprites();

  return {
    cdn,
    meta,
    svg,
  };

}

module.exports = getLocals;
