const path = require('path')

module.exports = {
  mode: 'production',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'thread-loader', 'babel-loader']
      }
    ]
  },
  externalsType: 'umd',
  externals: {
    vue: 'vue'
  },
  output: {
    clean: true,
    filename: 'main.js',
    library: {
      name: 'carl-vuex',
      type: 'umd',
      export: 'default'
    },
    path: path.resolve(__dirname, 'dist')
  }
}
