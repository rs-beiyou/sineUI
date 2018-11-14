const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageInfo = require('./package.json');

module.exports = merge(webpackBaseConfig, {
  devtool: '#cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: `js/[name]-${packageInfo.version}.min.js`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: `css/[name]-${packageInfo.version}.min.css`,
      allChunks: true
    })
  ]
});