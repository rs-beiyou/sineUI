const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "#source-map",
  // 入口：要进行处理的实例（js）
  entry: {
    bs: "./src/js/bs.js"
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
            'css-loader?minimize', 'autoprefixer-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize','autoprefixer-loader', 'less-loader?minimize'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.css', '.png', '.jpg' ,'.less']
  },
  //添加了此项，则表明从外部引入，内部不会打包合并进去
  externals: {
    jquery: 'window.jQuery'
  }
};
