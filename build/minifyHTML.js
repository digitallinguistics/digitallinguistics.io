const { minify } = require(`html-minifier`);
const path       = require(`path`);

module.exports = (content, outputPath = `.html`) => {

  if (!path.extname(outputPath) === `.html`) return content;

  return minify(content, {
    collapseWhitespace: true,
    removeComments:     true,
    useShortDoctype:    true,
  });

};
