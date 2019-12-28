module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.app.json',
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
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
