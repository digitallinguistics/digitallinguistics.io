/* eslint-disable
  no-invalid-this,
  no-shadow,
*/

const hbs = require(`handlebars`);

function section(name, opts) {
  if (!this.sections) this.sections = {};
  this.sections[name] = opts.fn(this);
  return null;
}

hbs.registerHelper(`section`, section);

module.exports = hbs;
