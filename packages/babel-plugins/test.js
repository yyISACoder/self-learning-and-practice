const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const core = require('@babel/core')
const generator = require('@babel/generator').default

const surceCode = fs.readFileSync(path.join(__dirname,'source.js'),{
  encoding: 'utf8'
})

const { code } = core.transformSync(surceCode,{
  plugins: [
    [
      path.join(__dirname,'clearPlugin.js'),
      {
        log: false,
        info: true,
        warn: true,
        error: true,
        trace: true,
        debug: false
      }
    ]
  ]
})

//const output = generator(ast,{},surceCode).code

fs.writeFileSync(path.join(__dirname,'target.js'),code)

console.log('complete!')