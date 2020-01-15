const path = require('path');

module.exports = {
  entry: {
    singleSpaEntry: './src/singleSpaEntry.js',
    store: './src/store.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'release'),
    libraryTarget: 'umd',
    library: 'nav'
  },

  module: {
    rules: [
      {
        test: /.js/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/nav/'
            }
          }
        ]
      }
    ]
  },

  mode: 'development',

  devtool: 'eval-source-map',
  // devtool: 'none',

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  }
};
