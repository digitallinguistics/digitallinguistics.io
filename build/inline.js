const { inlineSource: inline } = require(`inline-source`);
const path                     = require(`path`);

module.exports = (content, outputPath) => {

  if (!path.extname(outputPath) === `.html`) return content;

  return inline(content, {
    compress: true,
    rootpath: `./src`,
  });

};
