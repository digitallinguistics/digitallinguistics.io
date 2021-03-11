const { emptyDir } = require(`fs-extra`);
const path         = require(`path`);

const distPath = path.join(__dirname, `../dist`);

emptyDir(distPath);
