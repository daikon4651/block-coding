const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    // filename: 'js/bundle.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     implementation: require('sass'),
          //     sassOptions: {
          //       outputStyle: 'expanded',
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: 'asset/resource',
        // generator: {
        //   filename: 'images/[name].[contenthash][ext]',
        // },
        use: [
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.ejs$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              // minimize: false,
            }
          },
          'template-ejs-loader'
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      exclude: 'node_modules',
      fix: true,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/ejs/index.ejs',
      filename: 'index.html',
      inject: 'head',
      // minify: false,
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/style.[contenthash].css',
    // }),
  ],
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, './src/images/'),
      '@scss': path.resolve(__dirname, './src/scss/'),
    },
  },
};
