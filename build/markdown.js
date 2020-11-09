import Markdown from 'markdown-it';

export default new Markdown({
  breaks:      true,
  html:        true,
  linkify:     true,
  quotes:      `“”‘’`,
  typographer: true,
});
