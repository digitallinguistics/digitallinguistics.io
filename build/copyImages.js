import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';

const { copy } = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir     = path.join(currentDir, `../src`);
const docsDir    = path.join(currentDir, `../docs`);

export default async function copyImages() {
  await copy(path.join(srcDir, `img`), path.join(docsDir, `img`));
  await copy(path.join(srcDir, `favicon.ico`), path.join(docsDir, `favicon.ico`));
}
