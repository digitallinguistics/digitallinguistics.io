module.exports = (req, res, next) => {
  // if req.user, next()
  // otherwise redirect to login.digitallinguistics.org, with ?redirect_uri={original_url}
  // this middleware will need to come after the user management middleware
};
