/**
 * GET handler for the Bibliography page
 */

/* eslint-disable
  camelcase,
*/

const compare = require(`compare-func`);
const hbs     = require(`handlebars`);

const {
  markdown,
  mendeley,
} = require(`../../../lib`);

function convertMarkdown(ref) {
  ref.title = new hbs.SafeString(markdown.renderInline(ref.title));
  return ref;
}

module.exports = async context => {

  let references = await mendeley.getReferences();

  references = references
  .filter(ref => ref.read)
  .map(convertMarkdown)
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
    id:           `bibliography`,
    lastUpdated,
    references,
    title:        `Bibliography`,
  };

  return context.render(`bibliography/bibliography`, locals);

};
