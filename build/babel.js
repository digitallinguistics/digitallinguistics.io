const babel = require('babel-core');

module.exports = input => {
  return new Promise(resolve => {

    const options = { extends: './.babelrc', compact: false };

    const result = babel.transform(input, options);

    /** adding a date tag forces the service worker to reinstall every time nodemon restarts */
    const tag = '\n\nvar tag = "' + new Date() + '";';

    resolve(result.code + (global.env === 'local' ? tag : ''));

  });
};
