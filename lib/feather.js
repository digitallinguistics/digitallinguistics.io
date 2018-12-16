const hbs       = require(`handlebars`);
const { icons } = require(`feather-icons`);

function feather(icon) {
  return new hbs.SafeString(icons[icon].toSvg());
}

module.exports = feather;
