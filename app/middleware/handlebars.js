const handlebars     = require(`handlebars`);
const path           = require(`path`);
const templateEngine = require(`koa-hbs`);

const options = {
  defaultLayout: `main`,
  handlebars,
  layoutsPath:   path.join(__dirname, `../../layouts`),
  partialsPath:  path.join(__dirname, `../../components`),
  viewPath:      path.join(__dirname, `../../views`),
};

module.exports = templateEngine.middleware(options);
