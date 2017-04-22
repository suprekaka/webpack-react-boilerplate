const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')

module.exports = () => ({
  entry: {
    app: [
      './src/index',
    ],
  },

  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'es2015',
                {
                  modules: false,
                },
              ],
              'es2016',
              'es2017',
              'stage-3',
              'react',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            // {
            //   loader: 'style-loader',
            // },
            {
              loader: 'css-loader',
              options: {
                // sourceMap: true,
                // minimize: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url-loader?limit=1',
        query: {
          limit: 1,
          filename: '/font/[name].[ext]',
        },
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader?limit=1',
        query: {
          limit: 1,
          filename: '/img/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),

    new CleanPlugin(['dist'], {
      root: rootDir,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(rootDir, 'node_modules')], // speed up module lookup
    mainFields: ['jsnext:main', 'main'], // for support tree-shaking
  },

  performance: {
    // hints: 'warning',
  },

  devtool: 'source-map',

  context: rootDir,

  // stats: 'verbose',

  // profile: true,

  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
  },
})
