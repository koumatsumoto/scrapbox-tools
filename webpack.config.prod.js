const path = require('path');
const config = require('./webpack.config');

module.exports = {
  ...config,
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
  },
};
