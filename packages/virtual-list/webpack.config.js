const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'thread-loader', 'babel-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true // 开启css module功能
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  externalsType: 'umd',
  externals: {
    react: 'react'
  },
  output: {
    clean: true,
    filename: 'main.js',
    library: {
      name: 'virtual-list',
      type: 'umd',
      export: 'default'
    },
    path: path.resolve(__dirname, 'dist')
  }
}
