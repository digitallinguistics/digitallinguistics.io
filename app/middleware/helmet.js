const { production } = require(`../config`);
const helmet         = require(`koa-helmet`);

const config = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc:              [`'self' data: https: *.digitallinguistics.io`],
      upgradeInsecureRequests: production,
    },
  },
};

module.exports = helmet(config);
