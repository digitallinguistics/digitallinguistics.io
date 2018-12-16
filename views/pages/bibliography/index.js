/**
 * GET handler for the Bibliography page
 */

const { getReferences } = require(`../../../services`);

module.exports = async context => {

  const references = await getReferences();

  const locals = {
    bibliography: true,
    references,
    title:        `Bibliography`,
  };

  return context.render(`bibliography/bibliography`, locals);

};
