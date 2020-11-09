/* eslint-disable
  no-invalid-this,
*/

import { fileURLToPath } from 'url';
import fs                from 'fs';
import hbs               from 'handlebars';
import helpers           from 'ling-ref';
import path              from 'path';

const { readFileSync } = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

function section(name, opts) {
  if (!this.sections) this.sections = {};
  this.sections[name] = opts.fn(this);
  return null;
}

hbs.registerHelper({ section, ...helpers });

const templatePath = path.join(currentDir, `../node_modules/ling-ref/dist/reference.hbs`);
const reference    = readFileSync(templatePath, `utf8`);

hbs.registerPartial({ reference });

export default hbs;
