/* eslint-disable
  no-invalid-this,
*/

import hbs from 'handlebars';

function section(name, opts) {
  if (!this.sections) this.sections = {};
  this.sections[name] = opts.fn(this);
  return null;
}

hbs.registerHelper({ section });

export default hbs;
