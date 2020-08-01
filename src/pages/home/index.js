/**
 * GET handler for the Home page
 */

const locals = {
  home:  true,
  id:    `home`,
  title: `Home`,
};

module.exports = context => context.render(`home/home`, locals);
