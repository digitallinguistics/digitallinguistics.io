/**
 * GET handler for the Home page
 */

const locals = {
  home:  true,
  title: `Home`,
};

module.exports = context => context.render(`home/home`, locals);
