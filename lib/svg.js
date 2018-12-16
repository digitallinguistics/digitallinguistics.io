/**
 * This module loads the SVGs listed in svg.json and returns a hash of SVG sprites
 */

const featherIcons  = require(`../manifest/feather.json`);
const files         = require(`../manifest/svg.json`);
const { icons }     = require(`feather-icons`);
const path          = require(`path`);
const { promisify } = require(`util`);
const { readFile }  = require(`fs`).promises;
const Spriter       = require(`svg-sprite`);

const convertName = filepath => path.basename(filepath, `.svg`)
.replace(`.`, `-`);

const generator = (name, file) => `svg-${convertName(file.path)}`;

const opts = {
  mode: {
    symbol: {
      inline: true,
    },
  },
  shape: {
    dimension: {
      attributes: true,
    },
    id:      { generator },
    spacing: {
      padding: 0,
    },
  },
  svg: {
    dimensionAttributes: false,
    xmlDeclaration:      false,
  },
};

async function createFeatherSprite(icon) {

  const spriter = new Spriter(opts);
  const compile = promisify(spriter.compile).bind(spriter);
  const svg     = icons[icon].toSvg();

  spriter.add(`img/${icon}.svg`, null, svg);

  const { symbol: { sprite: { contents } } } = await compile();

  return {
    name: icon,
    svg:  contents.toString(),
  };

}

async function createFileSprite(file) {

  const spriter  = new Spriter(opts);
  const compile  = promisify(spriter.compile).bind(spriter);
  const filepath = path.join(__dirname, `..`, file);
  const name     = convertName(filepath);
  const svg      = await readFile(filepath, `utf8`);

  spriter.add(filepath, null, svg);

  const { symbol: { sprite: { contents } } } = await compile();

  return {
    name,
    svg: contents.toString(),
  };

}

async function getSprites() {

  const fileSprites    = await Promise.all(files.map(createFileSprite));
  const featherSprites = await Promise.all(featherIcons.map(createFeatherSprite));

  return [...fileSprites, ...featherSprites]
  .reduce((hash, { name, svg }) => {
    hash[name] = svg; // eslint-disable-line no-param-reassign
    return hash;
  }, {});

}

module.exports = getSprites;
