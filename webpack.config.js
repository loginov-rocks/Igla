/* eslint-env node */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
  entry: [
    paths.src + '/app/index.js',
    paths.src + '/app/index.scss',
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  output: {
    filename: 'scripts/bundle.js',
    path: path.resolve(__dirname, paths.dist),
  },
  plugins: [
    new CleanWebpackPlugin([paths.dist]),
    new ExtractTextPlugin('styles/bundle.css'),
    new HtmlWebpackPlugin({
      template: paths.src + '/index.html',
    }),
  ],
};

module.exports = config;
