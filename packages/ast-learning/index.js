const generator = require('@babel/generator')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const fs = require('fs')
const path = require('path')

function compile(code) {
  // 1.parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);

  // 2,traverse 转换代码
  traverse.default(ast, {
    ca
  });

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = fs.readFileSync(path.join(__dirname,'./source.js'),'utf-8')

const newCode = compile(code).code

fs.writeFileSync(path.join(__dirname,'./target.js'),newCode)
