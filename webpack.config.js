const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');


module.exports = {
  // @TODO comment: what does this do?
  mode: 'development',
  // gives a name to your bundle { name: .... }
  entry: {
    app: './src/client.js'
  },
  // @TODO comment: what does this do
  devtool: 'cheap-module-eval-source-map',
  externals: [nodeExternals()],
  // determines the name and place for your output bundles
  output: {
    filename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    // deletes the public folder for fresh builds
    new CleanWebpackPlugin(['public']),
  ],
  // @TODO comment: what does this do?
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
