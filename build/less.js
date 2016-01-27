const less = require('less');

module.exports = input => {
  return new Promise((resolve, reject) => {

    const lessOptions = { compress: true, globalVars: {} };

    less.render(input, lessOptions)
    .then(output => resolve(output.css))
    .catch(reject);

  });
};
