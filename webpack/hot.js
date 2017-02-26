const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const devServerPort = 5000

module.exports = () => ({
  entry: {
    app: [
      `webpack-dev-server/client?http://0.0.0.0:${devServerPort}`,
      'webpack/hot/only-dev-server',
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
        loaders: [
          'react-hot-loader',
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url-loader',
        // query: {
        //   limit: 0,
        //   name: '/font/[name].[ext]',
        // },
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader',
        // query: {
        //   limit: 0,
        //   name: '/img/[name].[ext]',
        // },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),

    // Enable multi-pass compilation for enhanced performance in larger projects
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),

    new HtmlPlugin({
      title: 'Dev-index',
      filename: 'index.html',
      template: path.resolve(rootDir, './template/index.ejs'),
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
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },

  context: rootDir,

  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
  },
})
