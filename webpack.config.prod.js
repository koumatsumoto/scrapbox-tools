const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.config');

module.exports = {
  ...config,
  mode: 'production',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.min.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
