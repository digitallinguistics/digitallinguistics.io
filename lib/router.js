module.exports = app => {
  app.get('404', handlers.error404);
  app.get('500', handlers.error500);
};
