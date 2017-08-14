const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  devtool: "#source-map",
  // 入口：要进行处理的实例（js）
  entry: {
    bs: "./src/js/bs.js",
    bootstrap:'./src/bootstrap.config.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize', 'postcss-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize','postcss-loader', 'less-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize','postcss-loader', 'sass-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.(gif|jpg|jpeg|png)\??.*$/,
        loader: 'url-loader?limit=10*1024'
      }, {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=600*1024'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.css', '.png', '.jpg' ,'.scss']
  },
  //添加了此项，则表明从外部引入，内部不会打包合并进去
  externals: {
    jquery: 'window.jQuery'
  }
};
