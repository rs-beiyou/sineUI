const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map'
});
