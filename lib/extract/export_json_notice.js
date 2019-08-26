const fs = require('fs')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

module.exports = (noticePath, noticeJsonData) => {
  const json = JSON.stringify(noticeJsonData, null, 2)

  const jsonExportPath = noticePath.split('.')[0] + '.json'

  return writeFileAsync(jsonExportPath, json)
    .then(() => {
      console.log(jsonExportPath + ' was created.')
    })
}
