const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    open: true,
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
  },
  watch: true,
  devtool: 'source-map',
});
