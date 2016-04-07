const port = 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'localhost'; // need to set NODE_ENV variable in Azure for this
process.env.PORT = process.env.PORT || port;

switch (process.env.NODE_ENV) {
  case 'localhost':
    process.env.DOMAIN = 'localhost:3000';
    break;
  case 'development':
    process.env.DOMAIN = 'dlx-dev.azurewebsites.net';
    break;
  case 'production':
    process.env.DOMAIN = 'digitallinguistics.org';
    break;
}

if (process.env.NODE_ENV === 'localhost') {
  require('../../credentials/dlx-org');
}
