const babel = require('babel-core');

module.exports = input => {
  return new Promise(resolve => {

    const options = { extends: './.babelrc', compact: false };

    const result = babel.transform(input, options);

    resolve(result.code);

  });
};
