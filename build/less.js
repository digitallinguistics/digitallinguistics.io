/* eslint-disable
  func-names,
  no-console,
  no-extra-parens,
*/

const fs   = require('fs');
const less = require('less');
const util = require('util');

const convert = async filename => {
  const lessData = await util.promisify(fs.readFile)(`less/${filename}`, `utf8`);
  const { css }  = await less.render(lessData);
  const path     = `public/css/${filename.replace(`.less`, `.css`)}`;
  await util.promisify(fs.writeFile)(path, css, `utf8`);
};

(async function() {
  const filenames = await util.promisify(fs.readdir)(`less`, `utf8`);
  await Promise.all(filenames.map(convert));
  console.log(`LESS files successfully converted.`);
}());
