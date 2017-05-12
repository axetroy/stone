/**
 * Created by axetroy on 2017/3/6.
 */

const webpack = require('webpack');
const path = require('path');

// webpack.config.js
module.exports = {
  entry: {
    stone: path.join(__dirname, 'index.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: 'stone',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.coffee', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      test: /\.min\.js$/
    })
  ]
};
