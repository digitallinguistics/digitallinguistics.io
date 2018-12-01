const Router = require(`koa-router`);

const router = new Router();

const get      = router.get.bind(router);
const redirect = router.redirect.bind(router);

get(`/`, context => {
  context.body = `Digital Linguistics (DLx)`;
});

// NOTE: router.redirect doesn't work with URLs
get(`/blog`, context => {
  context.status = 301;
  context.redirect(`https://medium.com/digital-linguistics`);
});

redirect(`/home`, `/`);

module.exports = router.routes();
