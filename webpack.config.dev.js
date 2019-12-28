const config = require('./webpack.config');

module.exports = {
  ...config,
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
};
