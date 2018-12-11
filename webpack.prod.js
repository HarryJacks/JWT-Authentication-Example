const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
   plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
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
            sourceMap: false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }
        ]
      }
    ]
  }
});