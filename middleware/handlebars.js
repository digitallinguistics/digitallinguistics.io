const handlebars       = require(`handlebars`);
const helpers          = require(`handlebars-helpers`);
const lingRef          = require(`ling-ref`);
const path             = require(`path`);
const { readFileSync } = require(`fs`);
const viewEngine       = require(`koa-hbs`);

const { length } = helpers.array();

const referencePath = path.join(__dirname, `../node_modules/ling-ref/src/reference.hbs`);
const reference     = readFileSync(referencePath, `utf8`);

handlebars.registerPartial({ reference });
handlebars.registerHelper(lingRef);

// Options for view engine
const options = {
  defaultLayout: `main/main`,
  extname:       `.hbs`,
  handlebars,
  helpers:       { length },
  layoutsPath:   path.join(__dirname, `../views/layouts`),
  partialsPath:  path.join(__dirname, `../views/components`),
  viewPath:      path.join(__dirname, `../views/pages`),
};

module.exports = viewEngine.middleware(options);
