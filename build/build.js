const babelConverter = require('./babel');
const converter = require('./converter');
const lessConverter = require('./less');

const babelConfig = {
  src: { path: './src', ext: 'js' },
  dest: { path: './public/js', ext: 'js' }
};

const lessConfig = {
  src: { path: './public/less', ext: 'less' },
  dest: { path: './public/css', ext: 'css' }
};

converter.convert(babelConverter, babelConfig);
converter.convert(lessConverter, lessConfig);
