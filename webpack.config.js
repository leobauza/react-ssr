const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Sets process.env.NODE_ENV by configuring DefinePlugin
  mode: 'development',
  // gives a name to your bundle { name: .... }
  entry: {
    app: './src/client.js'
  },
  // source mapping style https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-module-eval-source-map',
  // @TODO should apply only to server
  // externals: [nodeExternals()],
  // determines the name and place for your output bundles
  output: {
    filename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    // deletes the public folder for fresh builds
    new CleanWebpackPlugin(['public']),
  ],
  // sets rules for processing different files being 'imported'
  // (or loaded) into js files
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            // uses .babelrc as config
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
