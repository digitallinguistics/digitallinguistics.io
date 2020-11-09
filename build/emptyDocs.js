import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import path              from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const { emptyDir } = fs;

export default async function emptyDocs() {
  await emptyDir(path.join(currentDir, `../dist`));
}
