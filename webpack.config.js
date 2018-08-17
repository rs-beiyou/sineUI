const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// const fs = require('fs');
// const packageInfo = require('./package.json');

const styleLoaders = [{
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
}];

// const THEME_PATH = './src/sass/theme-pack';

// const resolveToThemeStaticPath = fileName => path.resolve(THEME_PATH, fileName);
// const themeFileNameSet = fs.readdirSync(path.resolve(THEME_PATH)).filter(fileName => fileName.includes('sine-'));
// const themePaths = themeFileNameSet.map(resolveToThemeStaticPath);
// const getThemeName = fileName => `${path.basename(fileName, path.extname(fileName))}-${packageInfo.version}`;
// // 全部 ExtractSass 的集合
// const themesExtractSassSet = themeFileNameSet.map(fileName => new ExtractTextPlugin('css/'+ getThemeName(fileName) +'.min.css'));
// // 主题 Loader 的集合
// const themeLoaderSet = themeFileNameSet.map((fileName, index) => {
//   return {
//     test: /\.(css|scss)$/,
//     include: resolveToThemeStaticPath(fileName),
//     loader: themesExtractSassSet[index].extract({
//       use: styleLoaders,
//       fallback: 'style-loader'
//     })
//   };
// });

module.exports = {
  // 入口：要进行处理的实例（js）
  entry: {
    sine: './src/dev.js'
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{
        from: /^\/$/,
        to: '/index.html'
      }]
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=true',
      exclude: /node_modules/,
      query: {
        presets: ['env']
      }
    },
    {
      test: /\.(scss|css)$/,
      // exclude: themePaths,
      use: ExtractTextPlugin.extract({
        use: styleLoaders,
        fallback: 'style-loader'
      })
    }, {
      test: /\.(gif|jpg|jpeg|png)\??.*$/,
      loader: 'url-loader',
      options: {
        limit: 10 * 1024,
        name: 'img/[name].[ext]'
      }
    }, {
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'url-loader',
      options: {
        limit: 60 * 1024,
        name: 'fonts/[name].[ext]'
      }
    }, {
      test: /\.(swf)\??.*$/,
      loader: 'url-loader',
      options: {
        limit: 60 * 1024,
        name: 'flash/[name].[ext]'
      }
    }, {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    },
    // ...themeLoaderSet
    ]
  },
  // plugins: [
  //    //...themesExtractSassSet,
  // ],
  resolve: {
    alias: {
      libs: path.resolve(__dirname, './libs'),
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