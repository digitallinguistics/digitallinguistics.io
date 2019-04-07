const Router   = require(`koa-router`);
const handlers = require(`./pages`);

const router = new Router();

const get      = router.get.bind(router);
const redirect = router.redirect.bind(router);

const externalRedirect = url => context => {
  context.status = 301; // eslint-disable-line no-param-reassign
  context.redirect(url);
};

// Routes & Redirects
get(`/`, handlers.home);
get(`/about`, handlers.about);
get(`/bibliography`, handlers.bibliography);
get(`/bibtex`, handlers.bibtex);
get(`/blog`, externalRedirect(`https://medium.com/digital-linguistics`));
redirect(`/home`, `/`);

module.exports = router.routes();
