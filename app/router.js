const Router               = require(`koa-router`);
const handlers             = require(`../views`);
const { externalRedirect } = require(`../lib`);

const router = new Router();

const get      = router.get.bind(router);
const redirect = router.redirect.bind(router);

// Routes & Redirects
get(`/`, handlers.home);
get(`/blog`, externalRedirect(`https://medium.com/digital-linguistics`));
redirect(`/home`, `/`);

module.exports = router.routes();
