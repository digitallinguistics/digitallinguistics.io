process.env.NODE_ENV = process.env.NODE_ENV || 'localhost';
process.env.PORT     = process.env.PORT || 3000;

module.exports = {
  env:  process.env.NODE_ENV,
  port: process.env.PORT,
};
