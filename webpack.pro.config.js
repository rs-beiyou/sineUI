const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: './',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: true
    })
  ],
});