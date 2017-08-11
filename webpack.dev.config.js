const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    plugins:[
      new ExtractTextPlugin({
          filename: '[name].min.css',
          allChunks: true
      })
    ]
});
