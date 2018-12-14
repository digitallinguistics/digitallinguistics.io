/**
 * GET handler for the home page
 */

const locals = {
  home:  true,
  title: `Home`,
};

module.exports = context => context.render(`home/home`, locals);
