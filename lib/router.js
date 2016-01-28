const handlers = require('./handlers');

module.exports = app => {
  app.get('/', handlers.home);
  app.get('/login', handlers.login);
  app.get('/register', handlers.register);
  app.get('/test', handlers.test);
};
