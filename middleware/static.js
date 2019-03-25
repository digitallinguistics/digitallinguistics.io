const serve = require(`koa-static`);
const path  = require(`path`);

const root = path.join(__dirname, `../public`);

module.exports = serve(root);
