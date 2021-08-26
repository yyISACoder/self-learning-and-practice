module.exports = function(babel) {
  return {
    visitor: {
      Identifier: {
				enter() {
					console.log("Entered!");
				},
				exit() {
					console.log("Exited!");
				}
  		}
    }
  }
}