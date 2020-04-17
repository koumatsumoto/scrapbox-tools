const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'km-study': path.join(__dirname, 'src/km-study.ts'),
    'km-public': path.join(__dirname, 'src/km-public.ts'),
    // load in puppeteer page context
    'run-in-puppeteer-page': path.join(
      __dirname,
      'src/deploy/browser-local-script/main.ts',
    ),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
