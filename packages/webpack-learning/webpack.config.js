const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
		clean: true,
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/my-site-root'
  },
	plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname, 'static','index.html')
    })
  ],
  optimization:{

  },
  devServer: {
    compress: true,
    port: 803
  },
  optimization:{
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  }
}