const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const devServerPort = 5000

module.exports = {
  entry: {
    index: [
      `webpack-dev-server/client?http://0.0.0.0:${devServerPort}`,
      'webpack/hot/only-dev-server',
      './src/index.jsx',
    ],
  },

  output: {
    path: './dist',
    filename: 'app.js',
    // publicPath: '/asset/'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel',
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url?limit=0',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),

    new ExtractTextPlugin('[name].css', { allChunks: true }),

    new HtmlPlugin({
      title: 'Dev-index',
      filename: 'index.html',
      template: './dev/tpl/index.ejs',
    }),
  ],

  devServer: {
    historyApiFallback: false,

    // Unlike the cli flag, this doesn't set HotModuleReplacementPlugin!
    hot: true,

    // If hot loader fail, inline use to notify browser refresh
    inline: true,
    host: '0.0.0.0',
    port: devServerPort,
    // proxy: {
    //   '**': {
    //     target: 'http://localhost:4000',
    //     secure: false
    //   }
    // }
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
}
