module.exports = {
  context: __dirname,
  entry:   {
    home: `views/pages/home/home.less`,
  },
  module: {
    rules: [
      {
        loader: `less-loader`,
        test:   /\.less$/u,
      },
    ],
  },
  output: {
    filename: `[name].css`,
  },
};
