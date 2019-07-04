const fs = require('fs')
const parser = require('xml2json')

module.exports = filePath => {
  const xml = fs.readFileSync(filePath).toString()
  const jsonString = parser.toJson(xml)
  return JSON.parse(jsonString)
}
