const handlers = require('./handlers');

module.exports = app => {
  app.get('/', handlers.home);
  app.delete('/account', handlers.account);
  app.get('/account', handlers.account);
  app.post('/account', handlers.account);
  app.get('/developer', handlers.developer);
  app.get('/login', cors(corsOpts), handlers.login);
  app.get('/myapps', handlers.myapps);
  app.get('/oauth/:service', handlers.oauth);
  app.get('/register', handlers.register);
  app.post('/register', handlers.register);
  app.get('/test', handlers.test);
};
