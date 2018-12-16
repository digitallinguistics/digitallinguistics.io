const handlebars  = require(`handlebars`);
const helpers     = require(`handlebars-helpers`);
const path        = require(`path`);
const viewEngine  = require(`koa-hbs`);

const { length } = helpers.array();

// Options for view engine
const options = {
  defaultLayout: `main/main`,
  extname:       `.hbs`,
  handlebars,
  helpers:       { length },
  layoutsPath:   path.join(__dirname, `../../views/layouts`),
  partialsPath:  path.join(__dirname, `../../views/components`),
  viewPath:      path.join(__dirname, `../../views/pages`),
};

module.exports = viewEngine.middleware(options);
