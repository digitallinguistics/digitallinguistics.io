const handlers = require('./handlers');

module.exports = app => {

  app.get('/', handlers.home);
  app.get('/test', handlers.test);

};
