const config = require('./webpack.config');

module.exports = {
  ...config,
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
