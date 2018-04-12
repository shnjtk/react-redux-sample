const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  plugins: [
    // remove bundle output directory before running new build
    new CleanWebpackPlugin(['dist']),
    // generate output index.html with bundle from template
    new HtmlWebpackPlugin({template: './src/index.html'}),
    // activate HMR
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: './dist',
    port: 8080,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                // Refer to the below site for other options.
                // https://babeljs.io/docs/plugins/preset-env/
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }],
              'stage-3',
              'react'
            ]
          }
        }
      }
    ]
  }
};
