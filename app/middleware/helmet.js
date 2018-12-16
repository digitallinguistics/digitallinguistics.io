const { production } = require(`../../config`);
const helmet         = require(`koa-helmet`);

const config = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc:              [`'self'`, `data:`, `https:`, `*.digitallinguistics.io`],
      scriptSrc:               [`'unsafe-inline'`],
      styleSrc:                [`'self'`, `https:`, `'unsafe-inline'`],
      upgradeInsecureRequests: production,
    },
  },
};

module.exports = helmet(config);
