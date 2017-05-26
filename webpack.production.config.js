'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const productionConfig = [{
  entry: {
    index: path.join(__dirname, 'client/main.js'),
    login: path.join(__dirname, 'client/login.jsx'),
  },
  output: {
    filename: './[name].js',
    path: path.resolve(__dirname, './client/public'),
    publicPath: '/',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    antd: 'antd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015'],
        plugins: [
          'transform-class-properties',
          ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }],
        ],
      },
    },
    { test: /\.json$/, loader: 'file-loader' },
    { test: /.ttf([?]?.*)$/, loader: 'file-loader' },
    { test: /\.(eot|woff|woff2|svg)([?]?.*)$/, loader: 'file-loader' },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=10000&name=./images/[name].[ext]',
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['client/public'], {
      exclude: ['jquery.min.js', 'react.min.js', 'react-dom.min.js', 'antd.min.css', 'antd.min.js'],
    }),
    new ExtractTextPlugin({
      filename: './[name].css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
}];

module.exports = productionConfig;
