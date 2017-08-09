const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');

module.exports = merge(webpackBaseConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    plugins:[
      new ExtractTextPlugin({
          filename: '[name].[hash].css',
          allChunks: true
      })
    ]
  ],
});
