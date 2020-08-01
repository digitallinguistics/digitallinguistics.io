/* eslint-disable
  no-invalid-this,
  no-shadow,
*/

const hbs = require(`handlebars`);

function block(name, opts) {
  if (!this.sections) this.sections = {};
  this.sections[name] = opts.fn(this);
  return null;
}

hbs.registerHelper(`block`, block);

module.exports = hbs;
