import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const { copy } = fs;

const distDir     = path.join(currentDir, `../dist`);
const imgDir      = path.join(currentDir, `../src/img`);
const faviconPath = path.join(currentDir, `../src/favicon.ico`);
const fontsDir    = path.join(currentDir, `../src/fonts`);

export default async function copyAssets() {
  await copy(imgDir, path.join(distDir, `img`));
  await copy(faviconPath, path.join(distDir, `favicon.ico`));
  await copy(fontsDir, path.join(distDir, `fonts`));
}
