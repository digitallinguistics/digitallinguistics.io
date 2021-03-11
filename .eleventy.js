const inline     = require(`./build/inline.js`);
const minifyHTML = require(`./build/minifyHTML.js`);

module.exports = config => {

  const now = new Date;

  config.addCollection(`posts`, collection => collection
    .getFilteredByGlob(`./src/posts/*.md`)
    .filter(post => post.date <= now && !post.data.draft));

  config.addLayoutAlias(`main`, `main/main.hbs`);
  config.addLayoutAlias(`post`, `post/post.hbs`);

  config.addPassthroughCopy(`src/favicon.ico`);
  config.addPassthroughCopy(`src/fonts`);
  config.addPassthroughCopy(`src/images`);

  config.addTransform(`inline`, inline);
  config.addTransform(`minifyHTML`, minifyHTML);

  config.setTemplateFormats([
    `hbs`,
    `html`,
    `md`,
  ]);

  return {
    dir: {
      includes: `partials`,
      input:    `src`,
      layouts:  `layouts`,
      output:   `dist`,
    },
  };

};
