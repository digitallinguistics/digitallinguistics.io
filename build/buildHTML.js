import { fileURLToPath } from 'url';
import Handlebars        from 'handlebars';
import path              from 'path';
import recurse           from 'recursive-readdir';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const { compile, template } = Handlebars;

async function buildHTML() {

  const files    = await recurse(path.join(currentDir, `../src`));
  const hbsFiles = files.filter(file => path.extname(file) === `.hbs`);

}

export default buildHTML;
