const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
		clean: true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/test',
    library: {
      name: 'microApp',
      type: 'umd'
    },
    //jsonpFunction: `webpackJsonp_microApp`,
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      },
      { 
        test: /.png|jpg|gif$/,
        type: 'asset/inline'
      }
    ]
  },
	plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname, 'static','index.html')
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    alias: {
      images: path.join(__dirname,'static','images')
    }
  },
  devServer: {
    compress: true,
    port: 803
  },
  //devtool: 'source-map',
  optimization:{
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minChunks : 1000
    }
  }
}