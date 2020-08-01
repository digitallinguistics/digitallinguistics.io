/**
 * Creates SVG sprites from the SVG files in the /img folder
 */

/* eslint-disable
  no-shadow,
*/

const path         = require(`path`);
const { readFile } = require(`fs-extra`);
const recurse      = require(`recursive-readdir`);
const spriter      = require(`svg2sprite`);

const spriteOptions = {
  iconPrefix: `svg-`,
  inline:     true,
};

/**
 * Creates a sprite from an SVG string
 * @param  {Object} info
 * @param  {String} info.name The name of the SVG
 * @param  {String} info.svg  The SVG, as a string
 * @return {Object}           Returns an object with "name" and "sprite" properties
 */
function createSprite({ name, svg }) {
  const collection = spriter.collection(spriteOptions);
  collection.add(name, svg);
  const sprite = collection.compile();
  return { name, sprite };
}

/**
 * A singleton that returns a hash of sprites
 * @return {Object} Returns the hash of sprites
 */
async function createSprites() {

  // add local SVG files
  const imageFiles = await recurse(path.join(__dirname, `../src/img`));
  const svgFiles   = imageFiles.filter(filePath => path.extname(filePath) === `.svg`);
  const svgs       = await Promise.all(svgFiles.map(readSVG));

  return svgs
  .map(createSprite)
  .reduce((hash, { name, sprite }) => {
    hash[name] = sprite; // eslint-disable-line no-param-reassign
    return hash;
  }, {});

}

/**
 * Reads a single SVG file
 * @param  {String} filePath Path to the SVG file
 * @return {Object}          Returns a hash with "name" and "svg" properties
 */
async function readSVG(filePath) {
  const svg  = await readFile(filePath, `utf8`);
  const name = path.basename(filePath, `.svg`).replace(`.`, `-`);
  return { name, svg };
}

module.exports = createSprites;
