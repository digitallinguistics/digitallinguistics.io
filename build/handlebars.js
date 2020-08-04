/* eslint-disable
  no-invalid-this,
*/

const hbs              = require(`handlebars`);
const helpers          = require(`ling-ref`);
const path             = require(`path`);
const { readFileSync } = require(`fs`);

function section(name, opts) {
  if (!this.sections) this.sections = {};
  this.sections[name] = opts.fn(this);
  return null;
}

hbs.registerHelper(`section`, { section, ...helpers });

const templatePath = path.join(__dirname, `../node_modules/ling-ref/dist/reference.hbs`);
const reference    = readFileSync(templatePath, `utf8`);

hbs.registerPartial({ reference });

module.exports = hbs;
