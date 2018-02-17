/* eslint-env node */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
  dist: './dist',
  src: './src',
};

const config = {
  devServer: {
    contentBase: paths.dist,
    port: 3000,
  },
  entry: paths.src + '/app/index.js',
  output: {
    filename: 'scripts/bundle.js',
    path: path.resolve(__dirname, paths.dist),
  },
  plugins: [
    new CleanWebpackPlugin([paths.dist]),
    new HtmlWebpackPlugin({
      template: paths.src + '/index.html',
    }),
  ],
};

module.exports = config;
