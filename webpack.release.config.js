const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackZipPlugin =require('webpack-zip-plugin');

module.exports = merge(webpackBaseConfig, {
  // 入口：要进行处理的实例（js）
  entry: {
    sine: './src/index.js',
    bootstrap: './src/bootstrap.config.js'
  },
  output: {
    path: path.join(__dirname, './release'),
    publicPath: '../',
    filename: 'js/[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  
      },
      compress: {
        warnings: false
      }
    }),
    
    new ExtractTextPlugin({
      filename: 'css/[name].min.css',
      allChunks: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.css$|\.js$|\.html$/,
      threshold: 0,
      minRatio: 1
    }),
    new WebpackZipPlugin({
      initialFile: './release',  //需要打包的文件夹(一般为dist)
      endPath: './static/release',  //打包到对应目录（一般为当前目录'./'）
      zipName: 'sineui.zip' //打包生成的文件名
    })
  ]
});