const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
module.exports = {
  // 入口：要进行处理的实例（js）
  entry: {
    sine: './src/main.js',
    bootstrap: './src/bootstrap.config.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=true',
      exclude: /node_modules/,
      query: {
        presets: ['env']
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader'
        }
        ],
        fallback: 'style-loader'
      })
    }, {
      test: /\.less/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader'
        }
        ],
        fallback: 'style-loader'
      })
    }, {
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader'
        }
        ],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(gif|jpg|jpeg|png)\??.*$/,
      loader: 'url-loader?limit=10*1024&name=images/[name].[ext]'
    }, {
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=600*1024&name=fonts/[name].[ext]'
    }, {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    }]
  },
  resolve: {
    alias: {
      libs: path.resolve(__dirname, './libs'),
      bootstrap: 'libs/bootstrap',
      fontAwesome: 'libs/fontAwesome',
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.css', '.png', '.jpg', '.scss']
  },
  //添加了此项，则表明从外部引入，内部不会打包合并进去
  externals: {
    jquery: 'window.jQuery',
    $: 'window.jQuery'
  }
};