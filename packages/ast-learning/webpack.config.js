const path = require('path')

module.exports = {
  mode: 'production',
  entry: './target.js',
  output: {
    clean: true,
    filename: 'bundle.js',
    path: path.join(__dirname,'dist')
  }
}