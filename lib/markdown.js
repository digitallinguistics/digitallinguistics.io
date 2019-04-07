/**
 * Configuration for Markdown converter
 */

const Markdown = require('markdown-it');

const markdown = new Markdown({
  breaks:      true,
  html:        true,
  linkify:     true,
  quotes:      `“”‘’`,
  typographer: true,
});

module.exports = markdown;
