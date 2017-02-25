const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const copyRight = 'copy right @ Kaka'

module.exports = {
  entry: {
    app: path.resolve(rootDir, 'src/index'),
  },

  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].min.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css?sourceMap', 'sass?sourceMap']),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url',
        query: {
          limit: 1,
          name: 'font/[name].[ext]',
        },
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url',
        query: {
          limit: 1,
          name: 'img/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new CleanPlugin(['dist'], {
      root: rootDir,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    new webpack.BannerPlugin(copyRight),

    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
}
