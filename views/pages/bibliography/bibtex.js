/**
 * GET handler for the BibTeX route
 */

const { mendeley } = require(`../../../lib`);

module.exports = async context => {
  const bibtex = await mendeley.getBibtex();
  context.body = bibtex;
  return context.attachment(`dlx.bib`);
};
