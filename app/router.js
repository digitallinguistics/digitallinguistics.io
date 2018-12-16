const Router               = require(`koa-router`);
const handlers             = require(`../views`);
const { externalRedirect } = require(`../lib`);

const router = new Router();

const get      = router.get.bind(router);
const redirect = router.redirect.bind(router);

// Routes & Redirects
get(`/`, handlers.home);
get(`/about`, handlers.about);
get(`/bibliography`, handlers.bibliography);
get(`/bibtex`, handlers.bibtex);
get(`/blog`, externalRedirect(`https://medium.com/digital-linguistics`));
redirect(`/home`, `/`);

module.exports = router.routes();
