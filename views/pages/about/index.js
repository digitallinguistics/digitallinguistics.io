/**
 * GET handler for the About page
 */

const locals = {
  about:  true,
  id:    `about`,
  title: `About`,
};

module.exports = context => context.render(`about/about`, locals);
