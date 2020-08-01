import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';

const { emptyDir } = fs;

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export default async function emptyDocs() {
  await emptyDir(path.join(currentDir, `../docs`));
}
