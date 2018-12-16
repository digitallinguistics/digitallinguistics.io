/**
 * GET handler for the About page
 */

const locals = {
  about:  true,
  title: `About`,
};

module.exports = context => context.render(`about/about`, locals);
