const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const shell = require('shelljs');

shell.cd(path.join(__dirname, './src/pages'));
const pugFiles = shell
  .ls('*.pug')
  .map(filePath => path.join(__dirname, `./src/pages/${filePath}`));

module.exports = {
  mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  entry: [
    ...pugFiles,
    path.join(__dirname, 'src/sass/app.sass'),
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: '.',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
              outputPath: '.',
            },
          },
          {
            loader: 'pug-html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src/img'), to: path.join(__dirname, 'dist/img') },
    ], {
      ignore: ['*.js', '*.css'],
    }),
  ],
};
