process.env.NODE_ENV = process.env.NODE_ENV || 'localhost';
process.env.PORT     = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'localhost') {
  require('../../credentials/digitallinguistics');
}

module.exports = {
  env:            process.env.NODE_ENV,
  mendeleyId:     process.env.MENDELEY_ID,
  mendeleySecret: process.env.MENDELEY_SECRET,
  port:           process.env.PORT,
};
