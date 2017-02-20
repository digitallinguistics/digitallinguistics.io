const handlebars = require('express-handlebars');

const options = {
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    // don't use arrow functions here - need to retain value of `this`
    section: function section(name, opts) {
      if (!this.sections) this.sections = {};
      this.sections[name] = opts.fn(this);
      return null;
    },
  },
};

const hbs = handlebars.create(options);

hbs.extname = options.extname;

module.exports = hbs;
