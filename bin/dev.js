const webpack = require('webpack');
const merge = require('webpack-merge');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config');
const config = require('../config');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true, // hotOnly 修改内容后command+s后，页面并不会刷新，而需要手动进行刷新
    inline: true,
    disableHostCheck: true,
    contentBase: config.path,
    compress: true,
    host: 'localhost',
    port: 8080,
    overlay: true,
    publicPath: config.pubicPath,
    proxy: {
      '/api': {
        target: 'http://xxx.meituan.com',
        changeOrigin: true,
      },
    },
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.staticSubDirectory,
    //     ignore: ['.*'],
    //   },
    // ]),
  ],
});

module.exports = devConfig;
