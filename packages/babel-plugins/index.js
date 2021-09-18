module.exports = function(babel){
  const {types: t} = babel

  return {
    name: 'yy-clear-plugins',
    visitor: {
      CallExpression(path,state) {
        if(path.node.callee && t.isIdentifier(path.node.callee.object,{name:'console'})) {
          const { opts } = state
          const property = path.node.callee.property

          if(opts[property.name]) {
            path.remove()
          }
        }
      },
      DebuggerStatement(path,state) {
        const { opts } = state
        if(opts.debug) {
          path.remove()
        }
      }
    }
  }
}