const babelConverter = require('./babel');
const converter = require('./converter');
const lessConverter = require('./less');

const babelConfig = {
  src: { path: './src/js', ext: 'js' },
  dest: { path: './public/js', ext: 'js' }
};

const lessConfig = {
  src: { path: './src/less', ext: 'less' },
  dest: { path: './public/css', ext: 'css' }
};

converter.convert(babelConverter, babelConfig);
converter.convert(lessConverter, lessConfig);
