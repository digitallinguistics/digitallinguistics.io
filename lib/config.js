const package = require('../package.json');

if (!process.env.WEBSITE_HOSTNAME) {
  global.env = 'local';
} else {
  if (process.env.WEBSITE_HOSTNAME === 'dlx-dev.azurewebsites.net') { global.env = 'development'; }
  else if (process.env.WEBSITE_HOSTNAME === 'dlx.azurewebsites.net') { global.env = 'production'; }
}

exports.bugs = package.bugs.url;
exports.env = global.env;
