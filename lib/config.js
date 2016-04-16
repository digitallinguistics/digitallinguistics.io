const port = 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'localhost'; // need to set NODE_ENV variable in Azure for this
process.env.PORT = process.env.PORT || port;

switch (process.env.NODE_ENV) {
  case 'localhost':
    process.env.DOMAIN = 'localhost';
    process.env.HOSTNAME = `${process.env.DOMAIN}:${process.env.PORT}`;
    break;
  case 'development':
    process.env.DOMAIN = process.env.HOSTNAME = 'dlx-dev.azurewebsites.net';
    break;
  case 'production':
    process.env.DOMAIN = process.env.HOSTNAME = 'digitallinguistics.org';
    break;
}

process.env.BASE_URL = `${process.env.NODE_ENV === 'localhost' ? 'http' : 'https'}://${process.env.HOSTNAME}`;
process.env.SCHEMAS = 'https://digitallinguistics.blob.core.windows.net/schemas';

if (process.env.NODE_ENV === 'localhost') {
  require('../../credentials/dlx-org');
}
