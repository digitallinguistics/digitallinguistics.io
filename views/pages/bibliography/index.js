/**
 * GET handler for the Bibliography page
 */

const locals = {
  bibliography: true,
  title:        `Bibliography`,
};

module.exports = context => context.render(`bibliography/bibliography`, locals);
