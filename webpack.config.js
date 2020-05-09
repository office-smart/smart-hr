var webpack = require('webpack')

// postcss plugins
var cssimport = require('postcss-import')
var customProperties = require('postcss-custom-properties')
var autoprefixer = require('autoprefixer')
var csswring = require('csswring')
var cssnested = require('postcss-nested')

module.exports = {
  entry: {
    app: ['./frontend-src/index.js']
  },
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  devtool: 'eval',
  debug: true,
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'babel' } }
    ],
    loaders: [
      { test: /\.js|\.tag$/, exclude: /node_modules/, include: /src/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  postcss: [cssimport, cssnested, customProperties, autoprefixer, csswring],
  devServer: {
    contentBase: './public/',
    port: 3333,
    hot: true,
    inline: true
  }
}
