const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.config');

module.exports = {
  ...config,
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
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
