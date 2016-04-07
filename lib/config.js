const port = 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'localhost'; // need to set NODE_ENV variable in Azure for this
process.env.PORT = process.env.PORT || port;

if (process.env.NODE_ENV === 'localhost') {
  require('../credentials/dlx-org');
}
