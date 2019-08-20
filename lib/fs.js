const fs = require('fs')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

module.exports = {
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile)
}
