const { writeFile } = require('../fs')

module.exports = (xmlDumpPath, noticesData) => {
  const ndjson = noticesData
    .map(JSON.stringify)
    .join('\n')

  const ndjsonExportPath = xmlDumpPath.replace(/\.xml$/, '.ndjson')

  return writeFile(ndjsonExportPath, ndjson)
    .then(() => {
      console.log(ndjsonExportPath + ' was created.')
    })
}
