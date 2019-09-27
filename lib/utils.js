// Log objects full depth
require('util').inspect.defaultOptions.depth = null

module.exports = {
  forceArray: obj => obj instanceof Array ? obj : [ obj ],
  findMatch: (arrayA, arrayB) => {
    for (let valueA of arrayA) {
      for (let valueB of arrayB) {
        if (valueA === valueB) return valueA
      }
    }
  }
}
