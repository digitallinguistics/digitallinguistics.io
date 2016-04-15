const authenticate = require('./authenticate');

exports.main = app => {

  const handlers = require('./main-handlers');

  app.get('/', handlers.home);
  app.get('/about', handlers.about);
  app.delete('/account', authenticate, handlers.account);
  app.get('/account', authenticate, handlers.account);
  app.post('/account', authenticate, handlers.account);
  app.get('/app', handlers.app);
  app.get('/blog', handlers.blog);
  app.get('/browse', handlers.data);
  app.get('/browser', handlers.data);
  app.get('/data', handlers.data);
  app.get('/dev', handlers.developer);
  app.get('/developer', handlers.developer);
  app.get('/explorer', handlers.data);
  app.get('/home', handlers.home);
  app.get('/learn', handlers.learn);
  app.get('/login', handlers.login);
  app.get('/schemas', handlers.schemas);
  app.get('/spec', handlers.schemas);
  app.get('/tools', handlers.app);

};

exports.developer = app => {

  const handlers = require('./dev-handlers');

  app.get('/', handlers.home);
  app.get('/api', handlers.api);
  app.get('/api/doc', handlers.doc);
  app.get('/app', handlers.app);
  app.get('/apps', authenticate, handlers.apps);
  app.get('/blog', handlers.blog);
  app.get('/code', handlers.code);
  app.get('/home', handlers.home);
  app.get('/schemas', handlers.spec);
  app.get('/sdks', handlers.tools);
  app.get('/spec', handlers.spec);
  app.get('/tools', handlers.tools);

};

exports.test = app => {
  app.get('/test', (req, res) => {
    res.render('test', { test: 'Test' });
  });
};
