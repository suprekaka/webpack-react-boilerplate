const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const copyRight = 'copy right @ Kaka'

module.exports = () => ({
  entry: {
    app: './src/index',
  },

  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].min.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: 'url-loader?limit=1',
        // options: {
        //   limit: 1,
        //   filename: '/font/[name].[ext]',
        // },
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: 'url-loader?limit=1',
        // options: {
        //   limit: 1,
        //   filename: '/img/[name].[ext]',
        // },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new CleanPlugin(['dist'], {
      root: rootDir,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),

    new webpack.BannerPlugin({
      banner: copyRight,
    }),

  ],

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },

  context: rootDir,

  profile: true,
})
