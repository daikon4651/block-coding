const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    app: './src/js/app.js',
    another: './src/js/another.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    // filename: 'js/[name].bundle.js',
    // chunkFilename: 'js/[name].js',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
        vendorModules: {
          chunks: 'initial',
          test: /[\\/]src[\\/]js[\\/]modules[\\/]/,
          name: 'vendor-modules',
          minSize: 0,
        },
      },
    },
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
      chunks: ['app'],
      inject: 'head',
      // minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/ejs/service/index.ejs',
      filename: 'service/index.html',
      chunks: ['another'],
      inject: 'head',
      // minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/ejs/works/index.ejs',
      filename: 'works/index.html',
      chunks: ['another'],
      inject: 'head',
      // minify: false,
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/style.[contenthash].css',
    // }),
  ],
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, './src/images/'),
      '@scss': path.resolve(__dirname, './src/scss/'),
    },
  },
};
