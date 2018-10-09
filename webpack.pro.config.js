const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const packageInfo = require('./package.json');

module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '../',
    filename: `js/[name]-${packageInfo.version}.min.js`
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
      filename: `css/[name]-${packageInfo.version}.min.css`,
      allChunks: true
    }),
    new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt'),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.css$|\.js$|\.html$/,
      threshold: 0,
      minRatio: 1
    })
  ],
});