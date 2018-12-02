const handlebars = require(`handlebars`);
const path       = require(`path`);
const viewEngine = require(`koa-hbs`);

// Options for view engine
const options = {
  defaultLayout: `main/main`,
  extname:       `.hbs`,
  handlebars,
  layoutsPath:   path.join(__dirname, `../../views/layouts`),
  partialsPath:  path.join(__dirname, `../../views/components`),
  viewPath:      path.join(__dirname, `../../views/pages`),
};

module.exports = viewEngine.middleware(options);
