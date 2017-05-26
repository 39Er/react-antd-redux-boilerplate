'use static';

// const webpack = require('webpack');
const path = require('path');

// const publicPath = 'http://localhost:8899/';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const CleanWebpackPlugin = require('clean-webpack-plugin');

let devConfig = {
  entry: {
    index: [
      path.join(__dirname, 'client/main.js'),
      hotMiddlewareScript,
    ],
    login: [
      path.join(__dirname, 'client/login.jsx'),
      hotMiddlewareScript,
    ],
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
  devtool: 'eval',
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
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
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
  ],
};

module.exports = devConfig;
