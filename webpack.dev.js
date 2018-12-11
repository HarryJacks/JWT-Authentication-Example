const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '/src',
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    })
  ],
  module: {
    rules: [
      {
        test:/\.(s*)css$/,
        use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      }
    ]
  }
});