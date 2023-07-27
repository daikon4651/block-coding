const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].js',
  },
  devServer: {
    open: true,
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    watchFiles: ['./src/**/*'],
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
});
