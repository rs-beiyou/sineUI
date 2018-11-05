// const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const WebpackZipPlugin =require('webpack-zip-plugin');
const packageInfo = require('./package.json');

module.exports = merge(webpackBaseConfig, {
  // 入口：要进行处理的实例（js）
  entry: {
    sine: './src/index.js',
    'sine-info': 'src/info.js'
  },
  output: {
    // path: path.join(__dirname, './release'),
    path: '/Users/zhangming/eclipse-workspace/sjgl/webapp/script/static/libs/sineui',
    publicPath: '../',
    filename: `js/[name]-${packageInfo.version}.min.js`
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
      filename: 'css/[name]-' + packageInfo.version + '.min.css',
      allChunks: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.css$|\.js$|\.html$/,
      threshold: 0,
      minRatio: 0.8
    }),
    // new WebpackZipPlugin({
    //   initialFile: './release',//需要打包的文件夹(一般为dist)
    //   endPath: './static/release',  //打包到对应目录（一般为当前目录'./'）
    //   zipName: `${packageInfo.name}-${packageInfo.version}.zip` //打包生成的文件名
    // })
  ]
});