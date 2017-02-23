const webpack = require('webpack')
// import webpack from 'webpack';
const plugins = require('webpack-load-plugins')()

// var commonsPlugin = new webpack.optimize.CommonsChunkPluginn('common.js');

const copyRight = 'copy right @ Kaka'

module.exports = {
  entry: {
    index: './src/index.jsx',
  },

  // entry: './src/js/main.jsx',

  output: {
    path: './dist',
    filename: 'app.min.js',
    // publicPath: '/asset/'
  },

  module: {
    loaders: [
      // {
      //   test: /\.css$/,
      //   loader: 'style!css'
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.scss$/,
        loader: plugins.extractText.extract('style', 'css!sass')
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.BannerPlugin(copyRight),
    // new plugins.html({
    //   title: 'dev-index',
    //   filename: 'index.html'
    // }),
    new plugins.extractText('[name].css', { allChunks: true }),
  ],

  resolve: {
    extensions: ['', '.js', '.css', '.scss', '.jsx', '.png', '.jpg']
  },
}
