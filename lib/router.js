const handlers = require('./handlers');

module.exports = app => {

  // route handlers
  app.get(`/`, handlers.home);
  app.get(`/about`, handlers.about);

  // generic error handlers
  app.use(handlers.notFound);
  app.use(handlers.serverError);

};
