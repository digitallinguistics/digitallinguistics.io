const handlebars     = require(`handlebars`);
const path           = require(`path`);
const templateEngine = require(`koa-hbs`);

const options = {
  defaultLayout: `main/index`,
  extname:       `.hbs`,
  handlebars,
  layoutsPath:   path.join(__dirname, `../../views/layouts`),
  partialsPath:  path.join(__dirname, `../../views/components`),
  viewPath:      path.join(__dirname, `../../views/pages`),
};

module.exports = templateEngine.middleware(options);
