const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.join(__dirname, './dist'),
    // path: '/Users/zhangming/eclipse-workspace/zzsoft5.0/webapp/script/static/libs/sineui',
    publicPath: '../',
    filename: 'js/[name].min.js'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   title: 'sineUI',
    //   template: 'src/template/index.html',
    //   inject:true
    // }),
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
    new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin()
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.css$|\.js$|\.html$/,
      threshold: 0,
      minRatio: 1
    })
  ],
});