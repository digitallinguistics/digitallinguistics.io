/**
 * GET handler for the Bibliography page
 */

/* eslint-disable
  camelcase,
*/

const compare           = require(`compare-func`);
const { getReferences } = require(`../../../services`);

module.exports = async context => {

  let references = await getReferences();

  references = references
  .filter(ref => ref.read)
  .map(ref => {
    delete ref.abstract;
    delete ref.notes;
    return ref;
  })
  .sort(compare(`citation_key`));

  const lastModified = references
  .reduce((latest, { last_modified }) => (last_modified >= latest ? last_modified : latest), ``);

  const lastUpdated = new Date(lastModified || new Date).toLocaleDateString(`en-US`, {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });

  const locals = {
    bibliography: true,
    lastUpdated,
    references,
    title:        `Bibliography`,
  };

  return context.render(`bibliography/bibliography`, locals);

};
