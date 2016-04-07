// middleware for user management
//
// if ?=logout, redirect to original URL with user logged out
// if user cookie, retrieve user and set to req.user and res.locals
// add a res.login function that takes one parameter (the redirect URI). This method redirects to login.digitallinguistics.org with a redirect_uri parameter
