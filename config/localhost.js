const {
  MENDELEY_BIBLIOGRAPHY,
  MENDELEY_ID,
  MENDELEY_SECRET,
} = require(`./credentials`);

module.exports = {
  CDN:             `https://digitallinguistics.blob.core.windows.net`,
  LOG_APP_ERRORS:  true,
  LOG_REQUESTS:    true,
  LOG_USER_ERRORS: true,
  MENDELEY_BIBLIOGRAPHY,
  MENDELEY_ID,
  MENDELEY_SECRET,
  PORT:            1337,
};
