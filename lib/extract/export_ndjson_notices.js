const fs = require('fs')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

module.exports = (xmlDumpPath, noticesData) => {
  const ndjson = noticesData
    .map(JSON.stringify)
    .join('\n')

  const ndjsonExportPath = xmlDumpPath.replace(/\.xml$/, '.ndjson')

  return writeFileAsync(ndjsonExportPath, ndjson)
    .then(() => {
      console.log(ndjsonExportPath + ' was created.')
    })
}
