const fs = require('fs')
const parser = require('xml2json')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)

module.exports = filePath => {
  return readFileAsync(filePath)
    .then(buffer => buffer.toString())
    .then(xml => {
      const jsonString = parser.toJson(xml)
      return JSON.parse(jsonString)
    })
}
