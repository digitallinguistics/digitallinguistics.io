/**
 * This module loads the SVGs listed in svg.json and returns a hash of SVG sprites
 */

const files         = require(`./svg.json`);
const path          = require(`path`);
const { promisify } = require(`util`);
const { readFile }  = require(`fs`).promises;
const Spriter       = require(`svg-sprite`);

const generator = (name, file) => path.basename(file.path, `.svg`);

const opts = {
  mode: {
    symbol: {
      inline: true,
    },
  },
  shape: {
    id: { generator },
  },
  svg: {
    dimensionAttributes: true,
    xmlDeclaration:      false,
  },
};


async function createSprite(file) {

  const spriter  = new Spriter(opts);
  const compile  = promisify(spriter.compile).bind(spriter);
  const filepath = path.join(__dirname, `..`, file);
  const name     = path.basename(filepath, `.svg`);
  const svg      = await readFile(filepath, `utf8`);

  spriter.add(filepath, null, svg);

  const { symbol: { sprite: { contents } } } = await compile();

  return {
    name,
    svg: contents.toString(),
  };

}

async function getSprites() {

  const sprites = await Promise.all(files.map(createSprite));

  return sprites.reduce((hash, { name, svg }) => {
    hash[name] = svg; // eslint-disable-line no-param-reassign
    return hash;
  }, {});

}

module.exports = getSprites;
