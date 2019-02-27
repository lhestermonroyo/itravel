var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  mode: 'development',
  devServer: {
    watchContentBase: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: './index.html'
    })
  ],
};